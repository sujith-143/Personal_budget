// cypress/e2e/signup.page.cy.js
describe('Signup Page', () => {
  beforeEach(() => {
    // Add a delay before visiting the URL
    cy.wait(5000); // Adjust the delay as needed
    cy.visit('http://localhost:3000/signup');
  });

  it('should display the signup form', () => {
    cy.get('h2').should('contain.text', 'Signup Page');
    cy.get('form').should('exist');
    cy.get('label').should('have.length', 2); // Assuming there are two labels for username and password
    cy.get('input[type="text"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').should('contain.text', 'Signup');
  });

  it('should successfully signup', () => {
    // Replace these values with the desired test data
    const username = 'user';
    const password = 'user';

    // Fill out the form
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);

    // Submit the form
    cy.get('button[type="submit"]').click();

    
  });

  // Add more test cases as needed
});
