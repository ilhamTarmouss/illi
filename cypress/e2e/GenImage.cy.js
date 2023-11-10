describe("Visit ABXREngine Website", () => {
  before(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  it("tests", () => {
    cy.visit("https://dev.abxrengine.com/signin");
    cy.get('input[data-cy="sign_in_email"]').type('ilhamgentille09@gmail.com');
    cy.get('input[data-cy="sign_in_password"]').type('firstTIME2023/@@');
    cy.get('[data-cy="sign_in_submit"]').click();
  
    // Use .should() with a timeout to ensure the URL changes as expected
    cy.url().should('eq', 'https://dev.abxrengine.com/projects', { timeout: 10000 });
    cy.viewport(1600, 1000);
    cy.get('[data-test="createProject"]').click();
    cy.wait(1000);
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
        cy.wrap($input).type('generate Building Image HD')
      });
      cy.get('[data-cy="chatgenai_send_button"]').click();
      cy.wait(1000);
      cy.intercept('POST', 'https://flowise.ibegoo.com/api/v1/prediction/*',
       (req) => {
          req.reply({
          statusCode: 200,
          body: '"Here is the HD image of the building you requested:\n\n1 : ![Building Image](https://abxr-backend.s3.amazonaws.com/media/n8n_test1699392673.png)\n\nWhat would you like to do next? You can choose to regenerate the image, add it to a scene, or generate a new image."',
        });
        }).as('generateImageRequest');
      cy.wait('@generateImageRequest');
      cy.contains('button', 'Regenerate').click();
      cy.wait(1000);
      
      cy.intercept('POST', 'https://flowise.ibegoo.com/api/v1/prediction/*',
       (req) => {
          req.reply({
          statusCode: 200,
          body: '"Here is your regenerated image of a building:\n\n2 : [Building Image HD](https://abxr-backend.s3.amazonaws.com/media/n8n_assets/n8n_test1699538551.png)\n\nWhat would you like to do next? You can choose to:\n1. \"Regenerate\" the image\n2. \"Add to scene\"\n3. Request a \"New Generation\" of a different image\nPlease specify your choice."',
        });
        }).as('RegenerateImageRequest');
        cy.wait('@RegenerateImageRequest');
      /*cy.intercept('POST', 'https://flowise.ibegoo.com/api/v1/prediction/* ', 
      '"Here is your regenerated image of a building:\n\n2 : [Building Image HD](https://abxr-backend.s3.amazonaws.com/media/n8n_assets/n8n_test1699538551.png)\n\nWhat would you like to do next? You can choose to:\n1. \"Regenerate\" the image\n2. \"Add to scene\"\n3. Request a \"New Generation\" of a different image\nPlease specify your choice."' )
      .as('RegenerateImageRequest');
      cy.intercept( 'GET' ,'https://abxr-backend.s3.amazonaws.com/media/n8n_test1699392673.png' , 
       req => {
        req.reply({
          statusCode: 200,
          fixture: "Images/image1.png"
        });
      })
      cy.wait('@RegenerateImageRequest');*/
      cy.wait(1000);
      cy.contains('button', 'Add to scene').click();
      cy.intercept('POST', '/api/v1/prediction/*',
       (req) => {
          req.reply({
          statusCode: 200,
          body: '"Your image \"Building Image HD\" has been successfully added to the scene under the category \"Architecture\" with tags \"building, HD, architecture\". \n\nWhat would you like to do next? You can choose to:\n1. \"Regenerate\" the image\n2. Add another image to the scene\n3. Request a \"New Generation\" of a different image\nPlease specify your choice."',
        });
        }).as('AddToScene');
      cy.wait('@AddToScene');
      //cy.contains('button', 'New Generation').click();
      cy.get('[data-cy="chatgenai_start_record_button"]').click();

      

     
  });
});
