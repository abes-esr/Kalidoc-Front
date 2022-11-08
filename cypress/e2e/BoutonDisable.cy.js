describe('Bouton disable', () => {
  it('test if button should be disable or enable', () => {
    cy.contains("CIBL").click();
    cy.get('.v-item--active > .v-input--selection-controls__input > .v-input--selection-controls__ripple').find("input").should("have.attr", "aria-checked", "true");
    cy.contains("Audiovisuel").click();
    cy.get('.flex-wrap > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple').should("be.checked")
    cy.get('.button').should('be.disabled');

    cy.get('.v-select__selections').click().type("123456789");
    cy.contains("RAPIDE").click();
    cy.get('.button').should('be.enabled');

    cy.get('.v-chip__content > .pr-2').contains("123456789");

    cy.get('.pe-1 > .v-btn__content').click();
    cy.get('.v-select__selections').should('have.value', '');
  })
})