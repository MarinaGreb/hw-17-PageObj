// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("ChangePassword", (userName, password) => {
  cy.contains(userName).click({ force: true });
  //меняем пароль
  cy.get(".layout-column-start > :nth-child(1) > .frm").type(password);
  cy.get( ":nth-child(4) > .form-page-group__main > .layout-column-start > :nth-child(2) > .frm"
  ).type(password);
  cy.get(".layout-row-end > .btn-service").click();
});
Cypress.Commands.add("ChangePasswordAPI", (cookie, password) => {
  cy.request({
    method: "PUT",
    headers: {
      Cookie: cookie,
    },
    url: "https://staging.lpitko.ru/api/account/password",
    body: { password: password },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});
