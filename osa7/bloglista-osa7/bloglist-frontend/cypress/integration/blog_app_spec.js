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

    describe('when logged in', function() {
        beforeEach(function() {
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

        it('a blog can be created', function() {
            cy.contains('new blog')
                .click()
            cy.get('#title')
                .type('Go is a cool language')
            cy.get('#author')
                .type('informed developer')
            cy.get('#url')
                .type('localhost')
            cy.contains('add')
                .click()
            cy.contains('Go is a cool language')
        })
    }) 
})