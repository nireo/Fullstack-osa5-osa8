describe('Blog ', function() {
    it('front page can be opened', function() {
      cy.visit('http://localhost:3000')
      cy.contains('Login')
    })

    it('user can log in to the app', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Login')

        cy.get('input:first')
            .type('testi2')
        cy.get('input:last')
            .type('salasana')
        cy.contains('login')
            .click()
        cy.contains('Blogs:')
    })
})