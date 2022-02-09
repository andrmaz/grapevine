import {SpecialistDbObject, SpecialistInput} from '../generated/models'

import {MongoDataSource} from 'apollo-datasource-mongodb'
import {ObjectId} from 'mongodb'
import {SpecialistModel} from '../models/specialist'

// This is optional
interface Context {
  specialist: SpecialistDbObject
}

export default class Specialists extends MongoDataSource<
  SpecialistDbObject,
  Context
> {
  async insertSpecialist(
    input: SpecialistInput
  ): Promise<SpecialistDbObject | null | undefined> {
    const specialist = new SpecialistModel(input)
    await specialist.save()
    return specialist
  }
  async getSpecialist(id: ObjectId): Promise<SpecialistDbObject | null> {
    const specialist = await SpecialistModel.findById<SpecialistDbObject>(id)
    return specialist
  }
  async incrementRecommendations(
    id: ObjectId
  ): Promise<SpecialistDbObject | null> {
    const specialist =
      await SpecialistModel.findByIdAndUpdate<SpecialistDbObject>(
        id,
        {$inc: {recommendations: 1}},
        {new: true}
      )
    return specialist
  }
}
