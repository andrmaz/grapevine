//import {options, url} from '../src/config'

import {CustomerModel} from '../src/models/customer'
import {SpecialistModel} from '../src/models/specialist'
//import {connector} from '../src/mongo'
//import mongoose from 'mongoose'

const customer = {
  name: 'John Doe',
  email: 'address@email',
  address: {city: 'Toronto'},
}
const specialist = {
  name: 'Jane Doe',
  email: 'email@address',
  address: {city: 'Toronto'},
  company: {bs: 'Supply-chain', name: 'Amazon'},
}

async function seed(): Promise<void> {
  await new CustomerModel(customer).save()
  await new SpecialistModel(specialist).save()
}

export default seed()
  .then(() => {
    console.info('The database has been seeded')
    process.exit(0)
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
