/// <reference types="Cypress" />
import { faker } from "@faker-js/faker";
//import { LoginPage } from "../pages/loginPage";
const loginPageElements = require("../fixtures/pages/loginPageSelectors.json");
const mainData = require("../fixtures/example.json");
let newPassword;

describe("Santa login - UI", () => {
  // let loginPage = new LoginPage();
  beforeEach(() => {
    newPassword = faker.internet.password(8);
    cy.log(newPassword);
  });

  //let oldPassword = "123456";


  it("User cannot login with old password - UI", () => {
    //смена пароля на новый
    cy.visit("/");
    cy.contains("Вход и регистрация").click({ force: true });
    // loginPage.login("sokovets@outlook.com", oldPassword);
    cy.Login(mainData.email, mainData.password);
    cy.contains("Коробки").should("exist");
    cy.ChangePassword("Марина", newPassword);
    //разлогин
    cy.contains("Выйти с сайта").click();

    //проверяем что не можем  войти со старым паролем
    cy.visit("/");
    cy.contains("Вход и регистрация").click({ force: true });
    //loginPage.login("sokovets@outlook.com", oldPassword);
    cy.Login(mainData.email, mainData.password);
    cy.contains("Неверное имя пользователя или пароль").should("exist");
    //авторизация с новым паролем
    cy.get(loginPageElements.passwordField).clear().type(newPassword);
    cy.get(loginPageElements.loginButton).click();
    cy.ChangePassword("Марина", mainData.password);
  });
  //новый тест через API
  it("User cannot login with old password - API, UI", () => {
    let cookie = "connect.sid=s%3AbKbWYkZrYgqwWMexWZxX-PzynxVhriNV.KzfzMTebXrX%2BJohOBjQ9H7pBZd8ATeBZ5B8pkoGnMsI; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwMDAwMTMsImlhdCI6MTY3Mjc3NzI3MSwiZXhwIjoxNjcyNzgwODcxfQ.oQtUk4mPVBz4rTz1McwSRF1pUwuTdEnx_4uy2gxznmk; refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwMDAwMTMsImlhdCI6MTY3Mjc3NzI3MSwiZXhwIjoxNjcyNzg0NDcxfQ.UIpOeTVXdmYKHEobMdHZdANP9Wqc1El3Z-MSKdvOYI0";
    //смена пароля на новый
    cy.ChangePasswordAPI(cookie, newPassword);
    //авторизация с новым паролем
    cy.visit("/login");
    //loginPage.login("sokovets@outlook.com", newPassword);
    cy.Login(mainData.email, newPassword);
    cy.contains("Коробки").should("exist");
    //разлогин
    cy.visit("/account");
    cy.contains("Выйти с сайта").click();
    //смена пароля на старый
    cy.ChangePasswordAPI(cookie, mainData.password);
    //авторизация со старым паролем
    cy.visit("/login");
    // loginPage.login("sokovets@outlook.com", oldPassword);
    cy.Login(mainData.email, mainData.password);
    cy.contains("Коробки").should("exist");
  });
});
