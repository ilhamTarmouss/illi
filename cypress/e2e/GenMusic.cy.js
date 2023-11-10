describe("Visit ABXREngine Website", () => {
    before(() => {
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
      });
    });
  
    it("Visits https://dev.abxrengine.com/signin", () => {
      
      cy.visit("https://dev.abxrengine.com/signin");
      cy.get('input[data-cy="sign_in_email"]').type('ilhamgentille09@gmail.com');
      cy.get('input[data-cy="sign_in_password"]').type('firstTIME2023/@@');
      cy.get('[data-cy="sign_in_submit"]').click();
  
      // Use .should() with a timeout to ensure the URL changes as expected
      cy.url().should('eq', 'https://dev.abxrengine.com/projects', { timeout: 10000 });
  
      // Set the viewport dimensions
      cy.viewport(1600, 1000);
      
      // Wait for an element to be clickable before clicking it
      cy.get(".addProject").should('be.visible').click();
      cy.wait(1000);
  
      // Use Cypress custom command 'cy.documentLoaded()' to wait for the document to be fully loaded
      cy.document()
        .then($document => {
          return new Cypress.Promise(resolve => {
            const onQueryEnd = () => {
              $document.removeEventListener("loaded", onQueryEnd);
              resolve();
            };
            $document.addEventListener("loaded", onQueryEnd);
          });
        })
        .then(() => {});
           
        cy.contains('button', 'Got it!').click();
        cy.get('[data-cy="open-asset-menu"]').click({ multiple: true });
        cy.contains('GenAI Images').click();
        /*cy.get('[data-cy="chatgenai_images"]').click();
        cy.get('[data-cy="chatgenai_input"]').type('generate a building hd image');
       */
        cy.get('[data-cy="chatgenai_input"]').each(($input) => {
          cy.wrap($input).click(); 
        });
        cy.get('[data-cy="chatgenai_start_record_button"]').click();

    });
});