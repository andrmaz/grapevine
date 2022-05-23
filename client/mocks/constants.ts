import faker from '@faker-js/faker'

export const id = faker.datatype.uuid()
export const name = faker.name.firstName()
export const email = faker.internet.email()
export const city = faker.address.city()
export const bs = faker.company.bs()
export const companyName = faker.company.companyName()
export const street = faker.address.streetName()
export const suite = faker.address.secondaryAddress()
export const zipcode = faker.address.zipCode()
export const phone = faker.phone.phoneNumber()
export const website = faker.internet.url()
export const catchPhrase = faker.company.catchPhrase()
export const lat = faker.address.latitude()
export const lng = faker.address.longitude()
export const address = {city, street, suite, zipcode}
export const company = {bs, name: companyName, catchPhrase}
export const geo = {lat, lng}
export const specialist = {
  id,
  name,
  email,
  phone,
  website,
  address,
  company,
  geo,
}
export const to = faker.datatype.uuid()
export const from = faker.datatype.uuid()
export const content = faker.lorem.sentence()
export const message = faker.lorem.sentence()
export const token = faker.random.alphaNumeric(32)
export const expiresAt = faker.datatype.number()
export const recommendations = faker.datatype.number(100)
