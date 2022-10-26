describe('First Test', () => {
  it('Nothing to do', () => {
    cy.visit('http://localhost:8080')

    cy.contains('type').click()
  })
})