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
    data: CustomerInput
  ): Promise<CustomerDbObject | null | undefined> {
    const customer = new CustomerModel(data)
    await customer.save()
    return customer
  }
  async getCustomer(id: ObjectId): Promise<CustomerDbObject | null> {
    // this.context has type `Context` as defined above
    // this.findOneById has type `(id: ObjectId) => Promise<UserDocument | null | undefined>`
    const customer = await CustomerModel.findById<CustomerDbObject>(id)
    return customer
  }
}
