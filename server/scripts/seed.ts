import {options, url} from '../src/config'

import {CustomerModel} from '../src/models/customer'
import Customers from '../src/datasources/customer'
import {SpecialistModel} from '../src/models/specialist'
import Specialists from '../src/datasources/specialist'
import {connector} from '../src/mongo'

;

(async function seed() {
  try {
    connector(url, options)
    const customers = new Customers(new CustomerModel())
    const specialists = new Specialists(new SpecialistModel())
    const customer = {
      name: 'John Doe',
      email: 'address@email',
      address: {city: 'Toronto'},
    }
    await customers.insertCustomer(customer)
    const specialist = {
      name: 'Jane Doe',
      email: 'email@address',
      address: {city: 'Toronto'},
      company: {bs: 'Supply-chain', name: 'Amazon'},
    }
    await specialists.insertSpecialist(specialist)
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
})()
