import {
  AuthenticationResult,
  Message,
  Role,
  Specialist,
} from '../generated/graphql'
import {GenericServerError, NotFoundError} from '../utils/errors'
import {
  MessageDbObject,
  SpecialistDbObject,
  SpecialistInput,
} from '../generated/models'
import jwtDecode, {JwtPayload} from 'jwt-decode'
import {prepareTypeMessage, prepareTypeSpecialist} from '../utils/type'

import {MessageModel} from '../models/message'
import {MongoDataSource} from 'apollo-datasource-mongodb'
import {SpecialistModel} from '../models/specialist'
import {createToken} from '../utils/auth'
import {validateSpecialistInput} from '../utils/validate'

// This is optional
interface Context {
  user: JwtPayload
}

export default class Specialists extends MongoDataSource<
  SpecialistDbObject,
  Context
> {
  async insertSpecialist(
    input: SpecialistInput
  ): Promise<AuthenticationResult> {
    validateSpecialistInput(input)
    const newSpecialist = new SpecialistModel(input)
    if (!newSpecialist) {
      throw new GenericServerError()
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
      throw new NotFoundError()
    }
    return prepareTypeSpecialist(specialist)
  }
  async getSpecialists(): Promise<Specialist[]> {
    const specialists = await SpecialistModel.find<SpecialistDbObject>().lean()
    if (!specialists) {
      throw new NotFoundError()
    }
    return specialists.map(specialist =>
      prepareTypeSpecialist(specialist as any)
    )
  }
  async getMessages(from: string, to: string): Promise<Message[]> {
    const messages = await MessageModel.find<MessageDbObject>({
      $or: [
        {from, to},
        {from: to, to: from},
      ],
    })
      .sort({createdAt: 1})
      .lean()
    if (!messages) {
      throw new NotFoundError()
    }
    return messages.map(message => prepareTypeMessage(message as any))
  }
  async incrementRecommendations(id: string): Promise<Specialist> {
    const specialist =
      await SpecialistModel.findByIdAndUpdate<SpecialistDbObject>(
        id,
        {$inc: {recommendations: 1}},
        {new: true}
      ).lean()
    if (!specialist) {
      throw new GenericServerError()
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
      throw new NotFoundError()
    }
    return prepareTypeSpecialist(specialist)
  }
}
