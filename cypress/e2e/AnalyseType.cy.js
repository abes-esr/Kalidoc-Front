describe('Sélection du type d\'analyse', () => {
    it('Analyse RAPIDE', () => {
        cy.get('[data-cy="QUICK"]').click({force:true});

        cy.get('div.v-item--active')
            .find('input')
            .should('have.attr', 'aria-checked', 'true');
    })

    it('Analyse EXPERTE', () => {
        cy.get('[data-cy="COMPLETE"]').click({force:true});

        cy.get('div.v-item--active')
            .find('input')
            .should('have.attr', 'aria-checked', 'true');
    })

    it('Analyse CIBLEE', () => {
        cy.get('[data-cy="FOCUS"]').click({force:true});

        cy.get('div.v-item--active')
            .find('input')
            .should('have.attr', 'aria-checked', 'true');
    })
})