Cypress.Commands.add('loginAndNavigateToProject', () => {
    cy.visit("https://dev.abxrengine.com/signin");
    cy.get('input[data-cy="sign_in_email"]').type('ilhamgentille09@gmail.com');
    cy.get('input[data-cy="sign_in_password"]').type('firstTIME2023/@@');
    cy.get('[data-cy="sign_in_submit"]').click();
  
    // Use .should() with a timeout to ensure the URL changes as expected
    cy.url().should('eq', 'https://dev.abxrengine.com/projects', { timeout: 10000 });
  
    // Set the viewport dimensions
    cy.viewport(1600, 1000);
  
    // Wait for an element to be clickable before clicking it
    cy.get(".addProject").should('be visible').click();
    cy.wait(1000);
   
  });
  