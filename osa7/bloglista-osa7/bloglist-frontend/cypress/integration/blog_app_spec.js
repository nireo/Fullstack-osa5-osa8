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
			// since the test database didn't work properly
			let randomNumber = Math.floor(Math.random() * 100)
			cy.contains('new blog')
				.click()
			cy.get('#title')
				.type('Go is a cool language' + randomNumber)
			cy.get('#author')
				.type('informed developer')
			cy.get('#url')
				.type('localhost')
			cy.contains('add')
				.click()
			cy.contains('Go is a cool language' + randomNumber)
		})

		it('can visit a specific user page', function() {
			cy.contains('Users')
				.click()
			cy.contains('Testi Mattinen')
				.click()
			cy.contains('Testi Mattinen')
		})

		it('can see specific blog page and can go back', function() {
			cy.contains('show more')
				.click()
			cy.contains('likes')
			cy.contains('localhost')
			cy.contains('really cool')
			cy.contains('Go back')
				.click()
			cy.contains('new blog')
		})

		/*  Sama juttu täällä kuin back-endissä ei toimi kunnolla database
            it('after reset it can display blog', function() {
                cy.request('POST', 'http://localhost:3001/api/blogs/reset)
                const blog = {
                    title: "Test databases are bad",
                    author: "the dev",
                    url: "localhost"
                }

                cy.request('POST', 'http://localhost:3001/api/blogs, blog)
                cy.contains('Test databases are bad')
            })


        */
	}) 
})