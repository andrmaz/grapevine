/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Create a new customer via request
     *
     * @returns {typeof login}
     * @example
     * cy.createUser()
     */
    login: typeof login
    /**
     * Check that the token provided matches the one in the local storage
     *
     * @returns {typeof checkToken}
     * @example
     * cy.checkToken()
     */
    checkToken: typeof checkToken
  }
}

