describe('First Test', () => {
  it('Nothing to do', () => {
    //Mock
    cy.intercept(Cypress.env('urlApi') + "/getFamillesDocuments",[{"id":"B","libelle":"Audiovisuel"}]);
    cy.intercept(Cypress.env('urlApi') + "/getRuleSets",[]); 

    cy.visit('http://localhost:8080');

    cy.contains("CIBL").click();
    cy.contains("Audiovisuel").click();
    //cy.contains("LANCER").should('be.');
  })
})
