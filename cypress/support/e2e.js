// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

before(() => {
    // Mock
    cy.intercept("/getFamillesDocuments",[{"id":"B","libelle":"Audiovisuel"}]);
    cy.intercept("/getRuleSets",[{"id":1,"libelle":"Les Zones 200"}]);

    // Réglage de la taille de la fenêtre
    cy.viewport(1400, 1000);

    // Affichage de la home page
    cy.visit('http://localhost:8080');
})

beforeEach(() => {
    // Réglage de la taille de la fenêtre
    cy.viewport(1400, 1000);
})