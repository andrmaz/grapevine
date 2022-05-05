import {Customer, Message, Role, Specialist} from '../generated/graphql'
import {
  CustomerDbObject,
  MessageDbObject,
  SpecialistDbObject,
} from '../generated/models'

export const prepareTypeCustomer = (dbObject: CustomerDbObject): Customer => {
  const {_id, ...obj} = dbObject
  const id = _id.toString()
  return {id, role: Role.User, ...obj}
}

export const prepareTypeSpecialist = (
  dbObject: SpecialistDbObject
): Specialist => {
  const {_id, ...obj} = dbObject
  const id = _id.toString()
  return {id, role: Role.Creator, ...obj}
}

export const prepareTypeMessage = (dbObject: MessageDbObject): Message => {
  const {_id, from, to, content} = dbObject
  const id = _id.toString()
  return {id, from, to, content}
}
