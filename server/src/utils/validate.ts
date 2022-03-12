import {CustomerInput, SpecialistInput, UserInput} from '../generated/models'

import {UserInputError} from 'apollo-server'

function validateUserInput(input: UserInput): void {
  if (!input.email.length) {
    throw new UserInputError('Email address is required')
  }
  if (!input.email.includes('@')) {
    throw new UserInputError('Invalid email address')
  }
  if (!input.name.length) {
    throw new UserInputError('Name field is required')
  }
}

function validateCustomerInput(input: CustomerInput): void {
  if (!input.email.length) {
    throw new UserInputError('Email address is required')
  }
  if (!input.email.includes('@')) {
    throw new UserInputError('Invalid email address')
  }
  if (!input.name.length) {
    throw new UserInputError('Name field is required')
  }
}

function validateSpecialistInput(input: SpecialistInput): void {
  if (!input.email.length) {
    throw new UserInputError('Email address is required')
  }
  if (!input.email.includes('@')) {
    throw new UserInputError('Invalid email address')
  }
  if (!input.name.length) {
    throw new UserInputError('Name field is required')
  }
  if (!input.address?.city.length) {
    throw new UserInputError('City field is required')
  }
  if (!input.company.name.length) {
    throw new UserInputError('Company name is required')
  }
  if (!input.company.bs.length) {
    throw new UserInputError('Company business is required')
  }
}

export {validateUserInput, validateCustomerInput, validateSpecialistInput}
