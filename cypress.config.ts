import {defineConfig} from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('before:browser:launch', () => {
        console.info(`Cypress running on ${config.browser}`)
      })
      return config
    },
  },
})