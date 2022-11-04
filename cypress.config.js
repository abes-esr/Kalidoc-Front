const { defineConfig } = require("cypress");

module.exports = defineConfig({

  env: {
    url: 'http://localhost:8080/',
    urlApi: 'http://localhost:8082/api/v1/',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
