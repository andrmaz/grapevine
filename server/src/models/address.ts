import mongoose from 'mongoose'

export const addressSchema = new mongoose.Schema({
  street: {type: String, required: false},
  suite: {type: String, required: false},
  city: {type: String, required: true},
  zipcode: {type: String, required: false},
  geo: {
    type: {
      latitude: {type: Number, required: true},
      longitude: {type: Number, required: true},
    },
    required: false,
  },
})

export const AddressModel = mongoose.model('Address', addressSchema)
