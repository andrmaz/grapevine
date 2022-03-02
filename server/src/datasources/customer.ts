import {AuthenticationResult, Role} from '../generated/graphql'
import {CustomerDbObject, CustomerInput} from '../generated/models'
import jwtDecode, {JwtPayload} from 'jwt-decode'

import {ApolloError} from 'apollo-server'
import {CustomerModel} from '../models/customer'
import {HydratedDocument} from 'mongoose'
import {MongoDataSource} from 'apollo-datasource-mongodb'
import {ObjectId} from 'mongodb'
import {createToken} from '../utils/auth'
import {validateCustomerInput} from '../utils/validate'

// This is optional
interface Context {
  customer: CustomerDbObject
}

export default class Customers extends MongoDataSource<
  CustomerDbObject,
  Context
> {
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
  async removeCustomer(id: ObjectId): Promise<CustomerDbObject | null> {
    const customer = await CustomerModel.findByIdAndDelete<CustomerDbObject>(id)
    if (!customer) {
      throw new ApolloError('Resource not found', '404')
    }
    return customer
  }
}
