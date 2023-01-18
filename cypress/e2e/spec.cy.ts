describe('Ecommerce', () => {
    it('contains neque word in footer', () => {
      cy.visit('http://localhost:3000')

      cy.get('footer').contains('neque')
    })
  })