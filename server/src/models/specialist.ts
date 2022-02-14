import {addressSchema} from './address'
import mongoose from 'mongoose'

export const specialistSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  address: {type: addressSchema, required: true},
  phone: {type: String, required: false},
  website: {type: String, required: false},
  company: {
    name: {type: String, required: true},
    catchPhrase: {type: String, required: false},
    bs: {type: String, required: true},
  },
  avatar: {type: String, required: false},
  recommendations: {type: Number, default: 0},
})

export const SpecialistModel = mongoose.model('Specialist', specialistSchema)
