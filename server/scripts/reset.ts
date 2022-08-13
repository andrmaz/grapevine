import {CustomerModel} from '../src/models/customer'
import {SpecialistModel} from '../src/models/specialist'
;
(async function reset() {
  try {
    await CustomerModel.deleteMany()
    await SpecialistModel.deleteMany()
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
})()
