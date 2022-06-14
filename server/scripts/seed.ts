import {CustomerModel} from '../src/models/customer'
import Customers from '../src/datasources/customer'
import {SpecialistModel} from '../src/models/specialist'
import Specialists from '../src/datasources/specialist'
;
(async function seed() {
  const customers = new Customers(new CustomerModel())
  const specialists = new Specialists(new SpecialistModel())
  const customer = {
    name: 'John Doe',
    email: 'address@email',
    address: {city: 'Nowhere'},
  }
  await customers.insertCustomer(customer)
  const specialist = {
    name: 'Jane Doe',
    email: 'email@address',
    address: {city: 'Toronto'},
    company: {bs: 'Supply-chain', name: 'Amazon'},
  }
  await specialists.insertSpecialist(specialist)
})()
