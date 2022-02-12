import {CustomerDbObject, CustomerInput} from '../generated/models'

import {CustomerModel} from '../models/customer'
import {MongoDataSource} from 'apollo-datasource-mongodb'
import {ObjectId} from 'mongodb'

// This is optional
interface Context {
  customer: CustomerDbObject
}

export default class Customers extends MongoDataSource<
  CustomerDbObject,
  Context
> {
  async insertCustomer(
    input: CustomerInput
  ): Promise<CustomerDbObject | null | undefined> {
    const customer = new CustomerModel(input)
    await customer.save()
    return customer
  }
  async getCustomer(id: ObjectId): Promise<CustomerDbObject | null> {
    const customer = await CustomerModel.findById<CustomerDbObject>(id)
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
    return customer
  }
}
