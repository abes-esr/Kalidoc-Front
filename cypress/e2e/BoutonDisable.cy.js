describe('Bouton disable', () => {
  it('test if button should be disable or enable', () => {
    cy.contains("CIBL").click();
    cy.get('[data-cy=FOCUSED]').should("have.attr", "aria-checked", "true");
    cy.contains("Audiovisuel").click();
    cy.get('[data-cy=B]').should("be.checked")
    cy.get('.button').should('be.disabled');

    cy.get('.v-select__selections').click().type("123456789");
    cy.contains("RAPIDE").click();
    cy.get('.button').should('be.enabled');

    cy.get('.v-chip__content > .pr-2').contains("123456789");

    cy.get('.pe-1 > .v-btn__content').click();
    cy.get('.v-select__selections').should('have.value', '');
  })
})