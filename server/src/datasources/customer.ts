import {ApolloError, AuthenticationError} from 'apollo-server'
import {AuthenticationResult, Role} from '../generated/graphql'
import {CustomerDbObject, CustomerInput, UserInput} from '../generated/models'
import {HydratedDocument, Types} from 'mongoose'
import jwtDecode, {JwtPayload} from 'jwt-decode'
import {validateCustomerInput, validateUserInput} from '../utils/validate'

import {CustomerModel} from '../models/customer'
import {MongoDataSource} from 'apollo-datasource-mongodb'
import {ObjectId} from 'mongodb'
import {createToken} from '../utils/auth'

// This is optional
interface Context {
  user: JwtPayload
}

export default class Customers extends MongoDataSource<CustomerDbObject, Context> {
  async insertCustomer(input: CustomerInput): Promise<AuthenticationResult> {
    validateCustomerInput(input)
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
  async getCustomer(id: ObjectId): Promise<CustomerDbObject | null> {
    const customer = await CustomerModel.findById<CustomerDbObject>(id)
    if (!customer) {
      throw new ApolloError('Resource not found', '404')
    }
    return customer
  }
  /* async addRecommendation(id: ObjectId): Promise<CustomerDbObject | null> {
    const customer_id = this.context.customer._id
    const customer = await CustomerModel.findByIdAndUpdate<CustomerDbObject>(
      customer_id,
      {$push: {specialists: {id}}},
      {new: true}
    )
    return customer
  } */
  async getRecommendations(
    id: ObjectId
  ): Promise<CustomerDbObject['specialists']> {
    const customer = await this.getCustomer(id)
    if (!customer) {
      throw new ApolloError('Resource not found', '404')
    }
    return customer?.specialists
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
