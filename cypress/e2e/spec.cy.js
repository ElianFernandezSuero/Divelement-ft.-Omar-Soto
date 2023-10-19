const { isVisible } = require("@testing-library/user-event/dist/utils")

describe('App Render', () => {

  it('should render the app without error', () => {
    let consoleErrors = [];
    cy.visit('http://localhost:3000') 
    cy.on('window:console', (msg) => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });
    cy.contains('QA Automation Cypress Test').should('be.visible')
    cy.then(() => {
      expect(consoleErrors).to.have.length(0);
  });    
  })

  it('should load with no notes entries', () => {
    cy.get('.note-container').should('not.exist')
  })

  it('should add a note to the list', () => {
    cy.visit('http://localhost:3000') 
    const noteContent = 'This is a test note'
    
    cy.get('#text-input').type(noteContent)
    cy.get('button[type="submit"]').click()
    cy.get('.note-container').contains(noteContent)
    })

    it('should delete a note from the list', () => {
      cy.visit('http://localhost:3000') 
      const noteContent = 'This is a test note to delete'
    
      cy.get('#text-input').type(noteContent)
      cy.get('button[type="submit"]').click()
      cy.get('.note-container').contains(noteContent).parent().find('button').click()
      cy.get('.list-container').should('not.contain', '.note-container')

    })
    
})
