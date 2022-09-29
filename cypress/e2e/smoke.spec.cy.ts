// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../support" />

// check this file using TypeScript if available
// @ts-check
import {aliasMutation, aliasQuery} from '../utils/graphql-test-utils'

context('Smoke Test', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    cy.exec('npm run db:reset && npm run db:seed', {timeout: 120000})
      .its('code')
      .should('eq', 0)

    cy.intercept('POST', 'http://localhost:4000', req => {
      aliasQuery(req, 'GetSpecialist')
      aliasQuery(req, 'GetSpecialists')
      aliasQuery(req, 'CustomerForProfile')
      aliasQuery(req, 'RecommendationsForDashboard')
      aliasMutation(req, 'AuthorizeCustomer')
      aliasMutation(req, 'IncrementRecommendations')
      aliasMutation(req, 'AddRecommendation')
    })
  })

  it('should add a specialist to the user recommendations list', () => {
    cy.visit('/')

    cy.url().should('contain', '/signin')
    cy.findByRole('textbox', {name: /email/i}).type('address@email')
    cy.findByRole('button', {name: /submit/i}).click()

    cy.wait('@gqlAuthorizeCustomerMutation')
      .its('response.body.data.authorizeCustomer.user')
      .should('have.property', 'token')

    cy.url().should('not.contain', '/signin')
    cy.findByRole('searchbox').type('supply-chain')
    cy.findByText(/supply-chain/i).should('be.visible')
    cy.findByRole('button', {name: /see more/i}).click()

    cy.wait('@gqlGetSpecialistQuery')
      .its('response.body.data.specialistForAbout.company')
      .should('have.property', 'bs', 'Supply-chain')

    cy.findByRole('button', {name: /add/i}).click({force: true})

    cy.wait('@gqlIncrementRecommendationsMutation')
      .its('response.body.data.incrementRecommendations.specialist')
      .should('have.property', 'recommendations', 1)

    cy.findByRole('link', {name: /dashboard/i}).click()

    cy.findByRole('link', {name: /jane doe/i}).should('be.visible')
    cy.findByRole('link', {name: /sign out/i}).click()
    cy.url().should('contain', '/signin')
  })
})
