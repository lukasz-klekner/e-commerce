describe('Ecommerce', () => {
    it('contains neque word in footer', () => {
      cy.visit('http://localhost:3000')

      cy.get('footer').contains('neque')
    })
    it('checks if email was added to the subs list', () => {
      cy.visit('http://localhost:3000/newsletter')

      cy.get(`[data-testid="email-newsletter-input"]`).type('testEmail@gmail.com')
      cy.get(`[data-testid="email-newsletter-button"]`).click()
      cy.contains('Zostales dodany do newslettera!')
    })
  })