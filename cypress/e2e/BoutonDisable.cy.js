describe('Bouton disable', () => {
  it('test if button should be disable or enable', () => {

    cy.get('[data-cy="FOCUS"]').click({multiple:true, force:true});
    cy.get('[data-cy="FOCUS"]').should("have.attr", "aria-checked", "true");
    cy.get('[data-cy="btn_lance_analyse"]').should('be.disabled');

    cy.contains("Audiovisuel").click();
    cy.get('[data-cy="B"]').should("be.checked");
    cy.get('[data-cy="btn_lance_analyse"]').should('be.disabled');
    // toujours pas de ppn entrer donc "disabled"

    cy.get('.v-select__selections').click().type("123456789").type('{enter}');
    cy.get('[data-cy=btn_lance_analyse]').should('be.enabled');

    cy.get('[data-cy="QUICK"]').click({multiple:true, force:true});
    cy.get('[data-cy="QUICK"]').should("have.attr", "aria-checked", "true");
    cy.get('[data-cy="btn_lance_analyse"]').should('be.enabled');

    cy.get('[data-cy="COMPLETE"]').click({multiple:true, force:true});
    cy.get('[data-cy="COMPLETE"]').should("have.attr", "aria-checked", "true");
    cy.get('[data-cy="btn_lance_analyse"]').should('be.enabled');
  })
})