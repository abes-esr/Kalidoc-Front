describe('First Test', () => {
  it('Nothing to do', () => {
    //Mock
    cy.intercept(Cypress.env('urlApi') + "/getFamillesDocuments",[{"id":"B","libelle":"Audiovisuel"}]);
    cy.intercept(Cypress.env('urlApi') + "/getRuleSets",[]);

    cy.viewport(1000, 1000);

    cy.visit(Cypress.env('url'));

    cy.contains("CIBL").click();
    cy.contains("Audiovisuel").click();

    cy.get('.button').should('be.disabled');

    cy.get('.v-select__selections').click().type("123456789");
    cy.contains("RAPIDE").click();
    cy.get('.button').should('be.enabled');

    cy.get('.v-chip__content > .pr-2').contains("123456789");

    cy.get('.pe-1 > .v-btn__content').click();
    cy.get('.v-select__selections').should('have.value', '');

    cy.get('.v-chip__content > .pr-2').contains("123456789");
  })
})