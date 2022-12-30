import {CustomerModel} from '../src/models/customer'
import {SpecialistModel} from '../src/models/specialist'
import {connector} from '../src/mongo'

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
  console.info('Seeding the database')
  connector(
    'mongodb://root:secret@localhost:27018/grapevine-db?&authSource=admin',
    {}
  )
  await new CustomerModel(customer).save()
  await new SpecialistModel(specialist).save()
}

export default seed()
  .then(() => {
    console.info('Database has been seeded')
    process.exit(0)
  })
  .catch(error => {
    console.error('Cannot seed the database', error)
    process.exit(1)
  })
