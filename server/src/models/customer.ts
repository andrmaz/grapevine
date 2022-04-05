/* import {CustomerDbObject} from 'src/generated/models'
 */ import {addressSchema} from './address'
import mongoose from 'mongoose'

//? https://github.com/GraphQLGuide/apollo-datasource-mongodb/issues/88
export const customerSchema = new mongoose.Schema(
  /* <CustomerDbObject> */ {
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: addressSchema, required: false},
    specialists: {
      type: [String],
      ref: 'Specialist',
      default: [],
    },
  }
)

export const CustomerModel = mongoose.model('Customer', customerSchema)
