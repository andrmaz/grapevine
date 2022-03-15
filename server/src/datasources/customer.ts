import {ApolloError, AuthenticationError, UserInputError} from 'apollo-server'
import {AuthenticationResult, Role} from '../generated/graphql'
import {
  CustomerDbObject,
  CustomerInput,
  SpecialistDbObject,
  UserInput,
} from '../generated/models'
import {HydratedDocument, Types} from 'mongoose'
import jwtDecode, {JwtPayload} from 'jwt-decode'
import {validateCustomerInput, validateUserInput} from '../utils/validate'

import {CustomerModel} from '../models/customer'
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
      throw new UserInputError('Email field is not correct')
    }
    const newCustomer: HydratedDocument<Omit<CustomerDbObject, '_id'>> =
      new CustomerModel(input)
    if (!newCustomer) {
      throw new ApolloError('Something went wrong', '500')
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
      throw new AuthenticationError('Wrong credentials')
    }
    const {_id, name, email} = existingCustomer
    const id = _id.toString()
    const userInfo = {id, name, email, role: Role.User}
    const token = createToken(userInfo)
    const decodedToken = jwtDecode<JwtPayload>(token)
    const expiresAt = decodedToken.exp
    return {token, userInfo, expiresAt}
  }
  async getCustomer(id: string): Promise<CustomerDbObject | null> {
    const customer_id = new Types.ObjectId(id)
    const customer = await CustomerModel.findById<CustomerDbObject>(customer_id)
    if (!customer) {
      throw new ApolloError('Resource not found', '404')
    }
    return customer
  }
  async addRecommendation(id: string): Promise<CustomerDbObject | null> {
    const sub = this.context.user.sub
    if (!sub) {
      throw new AuthenticationError('Not authorized')
    }
    const customer = await this.getCustomer(sub)
    const specialist_id = new Types.ObjectId(id)
    if (customer?.specialists.includes(specialist_id)) {
      return customer
    }
    const customer_id = new Types.ObjectId(sub)
    const updatedCustomer =
      await CustomerModel.findByIdAndUpdate<CustomerDbObject>(
        customer_id,
        {$push: {specialists: specialist_id}},
        {new: true}
      )
    return updatedCustomer
  }
  async getRecommendations(): Promise<SpecialistDbObject[]> {
    const id = this.context.user.sub
    if (!id) {
      throw new AuthenticationError('Not authorized')
    }
    const customer = await this.getCustomer(id)
    if (!customer) {
      throw new ApolloError('Resource not found', '404')
    }
    const recommendations: SpecialistDbObject[] = await Promise.all(
      customer?.specialists.map(specialistId =>
        SpecialistModel.findById(specialistId)
      )
    )
    return recommendations
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
  async removeCustomer(): Promise<CustomerDbObject | null> {
    const sub = this.context.user.sub
    const id = new Types.ObjectId(sub)
    const customer = await CustomerModel.findByIdAndDelete<CustomerDbObject>(id)
    if (!customer) {
      throw new ApolloError('Resource not found', '404')
    }
    return customer
  }
}
