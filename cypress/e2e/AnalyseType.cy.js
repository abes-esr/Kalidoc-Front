before(() => {
    // Mock
    cy.intercept("http://localhost:8082/api/v1/getFamillesDocuments",[{"id":"B","libelle":"Audiovisuel"}]);
    cy.intercept("http://localhost:8082/api/v1/getRuleSets",[]);

    // Réglage de la taille de la fenêtre
    cy.viewport(1400, 1000);

    // Affichage de la home page
    cy.visit('http://localhost:8080');
})

describe('Sélection du type d\'analyse', () => {
    it('Sélection recherche RAPIDE', () => {

        // TODO poursuivre les tests en vérifiant les valeurs

        cy.get('.v-input--radio-group__input > :nth-child(1)').click();
        cy.get('.v-input--radio-group__input > :nth-child(4)').click();
        cy.get('.v-input--radio-group__input > :nth-child(6)').click();
    })
})