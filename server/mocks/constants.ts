import {Role} from '../src/generated/graphql'
import {faker} from '@faker-js/faker'

export const id = faker.datatype.uuid()
export const name = faker.name.firstName()
export const email = faker.internet.email()
export const city = faker.address.city()
export const bs = faker.company.bs()
export const companyName = faker.company.companyName()
export const street = faker.address.street()
export const suite = faker.address.secondaryAddress()
export const zipcode = faker.address.zipCode()
export const phone = faker.phone.phoneNumber()
export const website = faker.internet.url()
export const catchPhrase = faker.company.catchPhrase()
export const company = {bs, name: companyName, catchPhrase}
export const lat = faker.address.latitude()
export const lng = faker.address.longitude()
export const geo = {lat, lng}
export const address = {city, street, suite, zipcode, geo}
export const to = faker.datatype.uuid()
export const from = faker.datatype.uuid()
export const content = faker.lorem.words()
export const sentence = faker.lorem.sentence()
export const token = faker.random.alphaNumeric(32)
export const expiresAt = faker.datatype.number()
export const recommendations = faker.datatype.number(100)
export const uuid = faker.datatype.uuid()
export const text = faker.lorem.text()
export const word = faker.lorem.word()
export const user = Role.User
export const creator = Role.Creator
export const admin = Role.Admin
export const userInfo = {id, name, email, role: user}
export const message = {id, from, to, content}
export const specialistForAbout = {
  id,
  name,
  email,
  phone,
  website,
  address,
  company,
}
export const specialist = {
  ...specialistForAbout,
  role: creator,
}
