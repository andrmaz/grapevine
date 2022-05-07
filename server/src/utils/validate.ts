import {
  BusinessRequiredError,
  CityRequiredError,
  CompanyRequiredError,
  EmailFieldError,
  EmailRequiredError,
  NameRequiredError,
} from './errors'
import {CustomerInput, SpecialistInput, UserInput} from '../generated/models'

function validateUserInput(input: UserInput): void {
  if (!input.email.length) {
    throw new EmailRequiredError()
  }
  if (!input.email.includes('@')) {
    throw new EmailFieldError()
  }
}

function validateCustomerInput(input: CustomerInput): void {
  if (!input.email.length) {
    throw new EmailRequiredError()
  }
  if (!input.email.includes('@')) {
    throw new EmailFieldError()
  }
  if (!input.name.length) {
    throw new NameRequiredError()
  }
}

function validateSpecialistInput(input: SpecialistInput): void {
  if (!input.email.length) {
    throw new EmailRequiredError()
  }
  if (!input.email.includes('@')) {
    throw new EmailFieldError()
  }
  if (!input.name.length) {
    throw new NameRequiredError()
  }
  if (!input.address?.city.length) {
    throw new CityRequiredError()
  }
  if (!input.company.name.length) {
    throw new CompanyRequiredError()
  }
  if (!input.company.bs.length) {
    throw new BusinessRequiredError()
  }
}

export {validateUserInput, validateCustomerInput, validateSpecialistInput}
