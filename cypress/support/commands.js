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
const loginPageElements = require("../fixtures/pages/loginPageSelectors.json");

Cypress.Commands.add("ChangePassword", (userName, password) => {
  cy.contains(userName).click({ force: true });
  //меняем пароль
  cy.get(loginPageElements.changePassword1Field).type(password);
  cy.get(loginPageElements.changePassword2Field).type(password);
  cy.get(loginPageElements.changePasswordButton).click();
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

Cypress.Commands.add("Login", (login, password) => {
  cy.get(loginPageElements.loginField).type(login);
  cy.get(loginPageElements.passwordField).type(password);
  cy.get(loginPageElements.loginButton).click();
});