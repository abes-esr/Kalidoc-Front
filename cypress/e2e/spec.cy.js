describe('First Test', () => {
  it('Nothing to do', () => {
    //Mock
    cy.intercept("http://localhost:8082/api/v1/getFamillesDocuments",[{"id":"B","libelle":"Audiovisuel"}]);
    cy.intercept("http://localhost:8082/api/v1/getRuleSets",[]);

    cy.viewport(1000, 1000);

    cy.visit('http://localhost:8080');

    cy.contains("CIBL").click();
    cy.contains("Audiovisuel").click();
    cy.get('.button').should('be.disabled');

    cy.get('.v-select__selections').click().type("123456789");
    cy.get('.v-select__selections').contains("123456789");
    cy.contains("RAPIDE").click();
    cy.get('.button').should('be.enabled');

    cy.get('[id^=btnClearAll]').click();
    cy.get('.v-select__selections').should('have.value', '');
  })
})