describe('Login Page', () => {
  beforeEach(() => {
    // Adding delay before visiting the URL
    cy.wait(5000); // Adjusting  delay as needed
    cy.visit('http://localhost:3000/login');
  });

  it('should display the login form', () => {
    cy.get('h2').should('contain.text', 'Login Page');
    cy.get('form').should('exist');
    cy.get('label').should('have.length', 2); // Assuming there are two labels for username and password
    cy.get('input[type="text"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').should('contain.text', 'Login');
  });
});
