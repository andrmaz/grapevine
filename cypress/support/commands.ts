/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

const query =
  'mutation AuthorizeCustomer($input: UserInput!) { authorizeCustomer(input: $input) {code success message user {userInfo {name id email role}token expiresAt}}}'

const login = () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:4000',
    body: {query},
    failOnStatusCode: false,
  }).then(resp => {
    const token = resp.body.data.authorizeCustomer.user.token
    cy.window().its('localStorage').invoke('setItem', token)
  })
}
const checkToken = (token: string) => {
  cy.window().its('localStorage.token').should('eq', token)
}

Cypress.Commands.add('login', login)
Cypress.Commands.add('checkToken', checkToken)
