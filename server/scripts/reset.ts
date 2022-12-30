import {CustomerModel} from '../src/models/customer'
import {SpecialistModel} from '../src/models/specialist'
import {connector} from '../src/mongo'

async function reset(): Promise<void> {
  console.info('Resetting the database')
  connector(
    'mongodb://root:secret@localhost:27018/grapevine-db?authSource=admin',
    {}
  )
  await CustomerModel.deleteMany()
  await SpecialistModel.deleteMany()
}

export default reset()
  .then(() => {
    console.info('The database has been reset')
    process.exit(0)
  })
  .catch(error => {
    console.error('Cannot reset the database', error)
    process.exit(1)
  })
