describe('First Test', () => {
  it('Nothing to do', () => {
    //Mock
    cy.intercept("https://qualimarc-dev.sudoc.fr/api/v1/getFamillesDocuments",[{"id":"B","libelle":"Audiovisuel"}]);
    cy.intercept("https://qualimarc-dev.sudoc.fr/api/v1/getRuleSets",[]);

    cy.visit('http://localhost:8080');

    cy.contains("CIBL").click();
    cy.contains("Audiovisuel").click();
    //cy.contains("LANCER").should('be.');
  })
})
