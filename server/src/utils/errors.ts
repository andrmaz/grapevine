import {ApolloError, AuthenticationError, UserInputError} from 'apollo-server'

export class GenericServerError extends ApolloError {
  constructor() {
    super('Something went wrong', '500')
  }
}
export class NotFoundError extends ApolloError {
  constructor() {
    super('Resource not found', '404')
  }
}
export class EmailFieldError extends UserInputError {
  constructor() {
    super('Email field is not correct')
  }
}
export class EmailRequiredError extends UserInputError {
  constructor() {
    super('Email address is required')
  }
}
export class NameRequiredError extends UserInputError {
  constructor() {
    super('Name field is required')
  }
}
export class CityRequiredError extends UserInputError {
  constructor() {
    super('City field is required')
  }
}
export class CompanyRequiredError extends UserInputError {
  constructor() {
    super('Company name is required')
  }
}
export class BusinessRequiredError extends UserInputError {
  constructor() {
    super('Company business is required')
  }
}
export class WrongCredentialsError extends AuthenticationError {
  constructor() {
    super('Wrong credentials')
  }
}
export class NotAuthorizeError extends AuthenticationError {
  constructor() {
    super('Not authorized')
  }
}
