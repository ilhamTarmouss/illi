const { defineConfig } = require("cypress");

module.exports = defineConfig({
 
  defaultCommandTimeout: 100000,
  requestTimeout: 10000,
  pageLoadTimeout: 100000,

  e2e: {
    experimentalStudio : true,
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
});
