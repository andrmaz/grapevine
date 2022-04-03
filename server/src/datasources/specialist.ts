import {AuthenticationResult, Specialist} from '../generated/graphql'
import {Role, SpecialistDbObject, SpecialistInput} from '../generated/models'
import jwtDecode, {JwtPayload} from 'jwt-decode'

import {ApolloError} from 'apollo-server'
import {HydratedDocument} from 'mongoose'
import {MongoDataSource} from 'apollo-datasource-mongodb'
import {SpecialistModel} from '../models/specialist'
import {createToken} from '../utils/auth'
import {prepareTypeSpecialist} from '../utils/type'
import { validateSpecialistInput } from '../utils/validate'

// This is optional
interface Context {
  specialist: SpecialistDbObject
}

export default class Specialists extends MongoDataSource<SpecialistDbObject, Context> {
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
  async getSpecialist(id: string): Promise<Specialist> {
    const specialist = await SpecialistModel.findById<SpecialistDbObject>(
      id
    ).lean()
    if (!specialist) {
      throw new ApolloError('Resource not found', '404')
    }
    return prepareTypeSpecialist(specialist)
  }
  async getSpecialists(): Promise<Specialist[]> {
    const specialists = await SpecialistModel.find<SpecialistDbObject>().lean()
    if (!specialists) {
      throw new ApolloError('Resource not found', '404')
    }
    return specialists.map(specialist => prepareTypeSpecialist(specialist))
  }
  async incrementRecommendations(id: string): Promise<Specialist> {
    const specialist =
      await SpecialistModel.findByIdAndUpdate<SpecialistDbObject>(
        id,
        {$inc: {recommendations: 1}},
        {new: true}
      ).lean()
    if (!specialist) {
      throw new ApolloError('Something went wrong', '500')
    }
    return prepareTypeSpecialist(specialist)
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
  async removeSpecialist(id: string): Promise<Specialist> {
    const specialist =
      await SpecialistModel.findByIdAndDelete<SpecialistDbObject>(id).lean()
    if (!specialist) {
      throw new ApolloError('Resource not found', '404')
    }
    return prepareTypeSpecialist(specialist)
  }
}
