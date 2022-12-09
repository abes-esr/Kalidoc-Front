const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "i4mqah",
  url: "http://localhost:8080",
  env: {
    urlApi: '',// http://localhost:8082/api/v1/
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
