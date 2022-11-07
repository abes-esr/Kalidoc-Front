const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "i4mqah",
  env: {
    url: 'http://localhost:8080/',
    urlApi: 'https://qualimarc-dev.sudoc.fr/api/v1/',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
