describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Kenny Vu',
      username: 'kvu123',
      password: 'sdfsdf'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
    cy.contains('username')
      .find('input')
    cy.contains('password')
      .find('input')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('kvu123')
      cy.get('#password').type('sdfsdf')
      cy.contains('login').click()

      cy.contains('Kenny Vu logged in')
    })

    it('fails with wrong credentials', function() {
      cy.visit('http://localhost:3000')
      cy.contains('username').find('input').type('kvu123')
      cy.contains('password').find('input').type('wrongpw')
      cy.contains('login').click()
      cy.get('.notification')
        .contains('wrong username or password')
        .should('have.css', 'background-color', 'rgb(245, 245, 220)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'kvu123', password: 'sdfsdf' })
    })

    it('A blog can be created', function() {
      cy.contains('create').click()
      cy.get('input[placeholder="write title here"]').type('Cypress Testing')
      cy.get('input[placeholder="write author here"]').type('Tim Cypress')
      cy.get('input[placeholder="write url here"]').type('http://blog.cypress.io')
      cy.get('button[type="submit"]').click()

      cy.contains('Cypress Testing ➡ Tim Cypress')
    })

    describe('and some blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'first blog', author: 'Blogger', url: 'http://blogman.com' })
        cy.createBlog({ title: 'second blog', author: 'Blogger', url: 'http://blogman.com' })
        cy.createBlog({ title: 'third blog', author: 'Blogger', url: 'http://blogman.com' })
        cy.createBlog({ title: 'fourth blog', author: 'Blogger', url: 'http://blogman.com' })
      })

      it('second blog can be liked multiple times', function() {
        cy.contains('second blog').find('button').click()
        cy.contains('like').click().click()
        cy.contains('likes: 2')
      })

      it('blog can be deleted by user who created blog', function() {
        cy.contains('fourth blog').find('button').click()
        cy.contains('remove').click()
        cy.contains('fourth blog by Blogger deleted.')
        cy.get('.blog').should('not.contain', 'fourth blog')
      })

      it('blogs are ordered by likes', function() {
        cy.contains('second blog').find('button').click()
        cy.contains('like').click().click()
        cy.contains('hide').click()
        cy.contains('third blog').find('button').click()
        cy.contains('like').click()
        cy.contains('hide').click()

        cy.get('.blog').eq(0).should('contain', 'second blog')
        cy.get('.blog').eq(1).should('contain', 'third blog')
      })

    })
  })
})