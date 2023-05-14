import {
  AuthenticationResult,
  Customer,
  Message,
  Role,
  Specialist,
} from '../generated/graphql'
import {
  CustomerDbObject,
  CustomerInput,
  MessageInput,
  SpecialistDbObject,
  UserInput,
} from '../generated/models'
import {
  EmailFieldError,
  GenericServerError,
  NotAuthorizeError,
  NotFoundError,
  WrongCredentialsError,
} from '../utils/errors'
import {Types} from 'mongoose'
import jwtDecode, {JwtPayload} from 'jwt-decode'
import {
  prepareTypeCustomer,
  prepareTypeMessage,
  prepareTypeSpecialist,
} from '../utils/type'
import {validateCustomerInput, validateUserInput} from '../utils/validate'

import {CustomerModel} from '../models/customer'
import {MessageModel} from '../models/message'
import {MongoDataSource} from 'apollo-datasource-mongodb'
import {SpecialistModel} from '../models/specialist'
import {createToken} from '../utils/auth'

// This is optional
interface Context {
  user: JwtPayload
}

export default class Customers extends MongoDataSource<
  CustomerDbObject,
  Context
> {
  async insertCustomer(input: CustomerInput): Promise<AuthenticationResult> {
    validateCustomerInput(input)
    const existingCustomer = await CustomerModel.findOne<CustomerDbObject>({
      email: input.email,
    })
    if (existingCustomer) {
      throw new EmailFieldError()
    }
    const newCustomer = new CustomerModel(input)
    if (!newCustomer) {
      throw new GenericServerError()
    }
    const savedCustomer = await newCustomer.save()
    const {id, name, email} = savedCustomer
    const userInfo = {id, name, email, role: Role.User}
    const token = createToken(userInfo)
    const decodedToken = jwtDecode<JwtPayload>(token)
    const expiresAt = decodedToken.exp
    return {token, userInfo, expiresAt}
  }
  async authorizeCustomer(input: UserInput): Promise<AuthenticationResult> {
    validateUserInput(input)
    const existingCustomer = await CustomerModel.findOne<CustomerDbObject>({
      email: input.email,
    })
    if (!existingCustomer) {
      throw new WrongCredentialsError()
    }
    const {_id, name, email} = existingCustomer
    const id = _id.toString()
    const userInfo = {id, name, email, role: Role.User}
    const token = createToken(userInfo)
    const decodedToken = jwtDecode<JwtPayload>(token)
    const expiresAt = decodedToken.exp
    return {token, userInfo, expiresAt}
  }
  async getCustomer(id: string): Promise<Customer> {
    const customer_id = new Types.ObjectId(id)
    const customer = await CustomerModel.findById<CustomerDbObject>(
      customer_id
    ).lean()
    if (!customer) {
      throw new NotFoundError()
    }
    return prepareTypeCustomer(customer)
  }
  async addRecommendation(id: string): Promise<Customer> {
    const sub = this.context.user.sub
    if (!sub) {
      throw new NotAuthorizeError()
    }
    const customer = await CustomerModel.findById<CustomerDbObject>(sub)
    if (!customer) {
      throw new NotFoundError()
    }
    if (customer.specialists.includes(id)) {
      throw new GenericServerError()
    }
    const customer_id = new Types.ObjectId(sub)
    const updatedCustomer =
      await CustomerModel.findByIdAndUpdate<CustomerDbObject>(
        customer_id,
        {$push: {specialists: id}},
        {new: true}
      ).lean()
    if (!updatedCustomer) {
      throw new GenericServerError()
    }
    return prepareTypeCustomer(updatedCustomer)
  }
  async getRecommendations(): Promise<Specialist[]> {
    const id = this.context.user.sub
    if (!id) {
      throw new NotAuthorizeError()
    }
    const customer = await this.getCustomer(id)
    if (!customer) {
      throw new NotFoundError()
    }
    const specialists = (await Promise.all(
      customer.specialists
        .map(specialistId =>
          SpecialistModel.findById<SpecialistDbObject>(specialistId).lean()
        )
        .filter(Boolean)
    )) as SpecialistDbObject[]
    return specialists.map(specialist => prepareTypeSpecialist(specialist))
  }
  /* async editCustomer(input: CustomerInput): Promise<CustomerDbObject | null> {
    const id = this.context.customer._id
    const customer = await CustomerModel.findByIdAndUpdate<CustomerDbObject>(
      id,
      {$set: {...input}},
      {new: true}
    )
    return customer
  } */
  async removeCustomer(): Promise<Customer> {
    const sub = this.context.user.sub
    const id = new Types.ObjectId(sub)
    const customer = await CustomerModel.findByIdAndDelete<CustomerDbObject>(
      id
    ).lean()
    if (!customer) {
      throw new NotFoundError()
    }
    return prepareTypeCustomer(customer)
  }
  async createMessage(input: MessageInput): Promise<Message> {
    const message = new MessageModel(input)
    const savedMessage = await message.save()
    return prepareTypeMessage(savedMessage as any)
  }
}
