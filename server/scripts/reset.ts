import {CustomerModel} from '../src/models/customer'
import {SpecialistModel} from '../src/models/specialist'
;
(async function reset() {
  await CustomerModel.deleteMany()
  await SpecialistModel.deleteMany()
})()
