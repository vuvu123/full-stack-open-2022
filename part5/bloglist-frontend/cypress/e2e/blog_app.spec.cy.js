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
    it('succeeds with correct credentials', async function() {
      const response = await cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'kvu123', password: 'sdfsdf'
      })
      localStorage.setItem('localBlogAppUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
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
})