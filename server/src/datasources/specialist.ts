import {SpecialistDbObject, SpecialistInput} from '../generated/models'

import {ApolloError} from 'apollo-server'
import {HydratedDocument} from 'mongoose'
import {MongoDataSource} from 'apollo-datasource-mongodb'
import {ObjectId} from 'mongodb'
import {SpecialistModel} from '../models/specialist'
import {validateSpecialistInput} from '../utils/validate'

// This is optional
interface Context {
  specialist: SpecialistDbObject
}

export default class Specialists extends MongoDataSource<
  SpecialistDbObject,
  Context
> {
  async insertSpecialist(input: SpecialistInput): Promise<SpecialistDbObject> {
    validateSpecialistInput(input)
    const specialist: HydratedDocument<Omit<SpecialistDbObject, '_id'>> =
      new SpecialistModel(input)
    if (!specialist) {
      throw new ApolloError('Something went wrong', '500')
    }
    await specialist.save()
    return specialist
  }
  async getSpecialist(id: ObjectId): Promise<SpecialistDbObject> {
    const specialist = await SpecialistModel.findById<SpecialistDbObject>(id)
    if (!specialist) {
      throw new ApolloError('Resource not found', '404')
    }
    return specialist
  }
  async getSpecialists(): Promise<SpecialistDbObject[]> {
    const specialists = await SpecialistModel.find<SpecialistDbObject>()
    if (!specialists) {
      throw new ApolloError('Resource not found', '404')
    }
    return specialists
  }
  async incrementRecommendations(id: ObjectId): Promise<SpecialistDbObject> {
    const specialist =
      await SpecialistModel.findByIdAndUpdate<SpecialistDbObject>(
        id,
        {$inc: {recommendations: 1}},
        {new: true}
      )
    if (!specialist) {
      throw new ApolloError('Something went wrong', '500')
    }
    return specialist
  }
  /* async editSpecialist(
    input: SpecialistInput
  ): Promise<SpecialistDbObject | null> {
    const id = this.context.specialist._id
    const specialist =
      await SpecialistModel.findByIdAndUpdate<SpecialistDbObject>(
        id,
        {$set: {...input}},
        {new: true}
      )
    return specialist
  } */
  async removeSpecialist(id: ObjectId): Promise<SpecialistDbObject> {
    const specialist =
      await SpecialistModel.findByIdAndDelete<SpecialistDbObject>(id)
    if (!specialist) {
      throw new ApolloError('Resource not found', '404')
    }
    return specialist
  }
}
