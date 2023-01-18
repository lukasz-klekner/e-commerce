import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'py3ssi',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
