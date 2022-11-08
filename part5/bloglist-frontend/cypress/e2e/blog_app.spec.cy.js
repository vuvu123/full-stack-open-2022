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
      .type('kvu123')
    cy.contains('password')
      .find('input')
      .type('sdfsdf')
    cy.contains('login').click()
  })
})