describe('Sélection du type d\'analyse', () => {
    it('Analyse RAPIDE', () => {
        cy.get('.v-input--radio-group__input > :nth-child(1)').click();
        cy.get('[id^=input-36]').click({force: true}).should('be.checked');
    })
    it('Analyse EXPERTE', () => {
        cy.get('.v-input--radio-group__input > :nth-child(4)').click();
        cy.get('[id^=input-39]').click({force: true}).should('be.checked');
    })
    it('Analyse CIBLEE', () => {
        cy.get('.v-input--radio-group__input > :nth-child(6)').click();
        cy.get('[id^=input-42]').click({force: true}).should('be.checked');
    })
})