context('Phonebook', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
    cy.clearLocalStorage()
  })

  // https://on.cypress.io/interacting-with-elements

  it('Should add new contact', () => {
    // https://on.cypress.io/type
    cy.get('#name')
      .type('Bob Smith').should('have.value', 'Bob Smith')

    cy.get('#phone')
      // Ignore error checking prior to type
      // like whether the input is visible or disabled
      .type('+380121314118')
      .should('have.value', '+380121314118')

    cy.get('input#newcontact').click()
    cy.get('.list')
    .get('.list>p')
    .should('contain', 'Bob Smith : +380121314118')
  })
})
