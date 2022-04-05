import {
  Customer,
  CustomerDbObject,
  Message,
  MessageDbObject,
  Specialist,
  SpecialistDbObject,
} from '../generated/models'

export const prepareTypeCustomer = (dbObject: CustomerDbObject): Customer => {
  const {_id, ...obj} = dbObject
  const id = _id.toString()
  return {id, ...obj}
}

export const prepareTypeSpecialist = (
  dbObject: SpecialistDbObject
): Specialist => {
  const { _id, ...obj } = dbObject
  const id = _id.toString()
  return {id, ...obj}
}

export const prepareTypeMessage = (dbObject: MessageDbObject): Message => {
  const {_id, from, to, content} = dbObject
  const id = _id.toString()
  return {id, from, to, content}
}
