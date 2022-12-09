describe('Sélection du type d\'analyse', () => {
    it('Analyse RAPIDE', () => {
        cy.get('.v-input--radio-group__input > :nth-child(1)').click();

        cy.get('div.v-item--active')
            .find('input')
            .should('have.attr', 'aria-checked', 'true');
    })

    it('Analyse EXPERTE', () => {
        cy.get('.v-input--radio-group__input > :nth-child(4)').click();

        cy.get('div.v-item--active')
            .find('input')
            .should('have.attr', 'aria-checked', 'true');
    })

    it('Analyse CIBLEE', () => {
        cy.get('.v-input--radio-group__input > :nth-child(6)').click();

        cy.get('div.v-item--active')
            .find('input')
            .should('have.attr', 'aria-checked', 'true');
    })
})