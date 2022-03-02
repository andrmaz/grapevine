import {Role, SpecialistDbObject, SpecialistInput} from '../generated/models'
import jwtDecode, {JwtPayload} from 'jwt-decode'

import {ApolloError} from 'apollo-server'
import {AuthenticationResult} from '../generated/graphql'
import {HydratedDocument} from 'mongoose'
import {MongoDataSource} from 'apollo-datasource-mongodb'
import {ObjectId} from 'mongodb'
import {SpecialistModel} from '../models/specialist'
import {createToken} from '../utils/auth'
import {validateSpecialistInput} from '../utils/validate'

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
  ): Promise<AuthenticationResult> {
    validateSpecialistInput(input)
    const newSpecialist: HydratedDocument<Omit<SpecialistDbObject, '_id'>> =
      new SpecialistModel(input)
    if (!newSpecialist) {
      throw new ApolloError('Something went wrong', '500')
    }
    const savedSpecialist = await newSpecialist.save()
    const {id, name, email} = savedSpecialist
    const userInfo = {id, name, email, role: Role.Creator}
    const token = createToken(userInfo)
    const decodedToken = jwtDecode<JwtPayload>(token)
    const expiresAt = decodedToken.exp
    return {token, userInfo, expiresAt}
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
