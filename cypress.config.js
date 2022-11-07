const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "i4mqah",
  env: {
    url: 'http://localhost:8080/',
    urlApi: '',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
