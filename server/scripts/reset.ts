//import {options, url} from '../src/config'

import {CustomerModel} from '../src/models/customer'
import {SpecialistModel} from '../src/models/specialist'
//import {connector} from '../src/mongo'
//import mongoose from 'mongoose'

async function reset(): Promise<void> {
  await CustomerModel.deleteMany()
  await SpecialistModel.deleteMany()
}

export default reset()
  .then(() => {
    console.info('The database has been reset')
    process.exit(0)
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
