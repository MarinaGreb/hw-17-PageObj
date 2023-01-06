/// <reference types="Cypress" />
const mainData = require("../fixtures/example.json");
import { faker } from "@faker-js/faker";
describe("Actions With Boxes", () => {
  let cookie =
    "connect.sid=s%3AbKbWYkZrYgqwWMexWZxX-PzynxVhriNV.KzfzMTebXrX%2BJohOBjQ9H7pBZd8ATeBZ5B8pkoGnMsI; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwMDAwMTMsImlhdCI6MTY3Mjc3NzI3MSwiZXhwIjoxNjcyNzgwODcxfQ.oQtUk4mPVBz4rTz1McwSRF1pUwuTdEnx_4uy2gxznmk; refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwMDAwMTMsImlhdCI6MTY3Mjc3NzI3MSwiZXhwIjoxNjcyNzg0NDcxfQ.UIpOeTVXdmYKHEobMdHZdANP9Wqc1El3Z-MSKdvOYI0";
  let boxName = faker.animal.type();
  let boxKey = faker.internet.password(4);

  //новый тест через API
  it("Create Box 1", () => {
    cy.request({
      method: "POST",
      headers: {
        Cookie: cookie,
      },
      url: "/api/box",
      body: {
        email: null,
        name: boxName,
        key: boxKey,
        picture: null,
        usePost: false,
        useCashLimit: null,
        cashLimit: null,
        cashLimitCurrency: null,
        useWish: true,
        useCircleDraw: null,
        isInviteAfterDraw: null,
        isArchived: null,
        createAdminCard: null,
        isCreated: true,
        useNames: true,
        isPhoneRequired: false,
        logo: null,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('canCreateCards').and.eq(true);//Проверка что есть возможность добавить карточки 

    });
    cy.log(boxName);
    cy.log(boxKey);
  });
  it("Delete Box", () => {
    cy.request({
      method: "DELETE",
      headers: {
        Cookie: cookie,
      },
      url: `/api/box/${boxKey}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Creating box 2 with all fields filled in", () => {
    cy.request({
      method: "POST",
      headers: {
        Cookie: cookie,
      },
      url: "/api/box",
      body: {
        email: null,
        name: boxName,
        key: boxKey,
        picture: "cup_one",
        usePost: true,
        useCashLimit: true,
        cashLimit: 100,
        cashLimitCurrency: "usd",
        useWish: true,
        useCircleDraw: null,
        isInviteAfterDraw: null,
        isArchived: null,
        createAdminCard: null,
        isCreated: true,
        useNames: true,
        isPhoneRequired: true,
        logo: null,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.nested.property('box.name').and.eq(`${boxName}`);//Проверка, что создана коробока с именем из перемнной boxName 
      expect(response.body).to.have.nested.property('box.key').and.eq(`${boxKey}`);//Проверка, что создана коробока с ключем из перемнной boxKey 
    });
    cy.log(boxName);
    cy.log(boxKey);
  });
  it("Get all available boxes", () => {
    cy.request({
      method: "GET",
      headers: {
        Cookie: cookie,
      },
      url: "/api/account/boxes",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it("Delete Box 2", () => {
    cy.request({
      method: "DELETE",
      headers: {
        Cookie: cookie,
      },
      url: `/api/box/${boxKey}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it("Creating box 3 with max. cashLimit", () => {
    cy.request({
      method: "POST",
      headers: {
        Cookie: cookie,
      },
      url: "/api/box",
      body: {
        email: null,
        name: boxName,
        key: boxKey,
        picture: "cup_one",
        usePost: true,
        useCashLimit: true,
        cashLimit: 999999,
        cashLimitCurrency: "uah",
        useWish: true,
        useCircleDraw: null,
        isInviteAfterDraw: null,
        isArchived: null,
        createAdminCard: null,
        isCreated: true,
        useNames: true,
        isPhoneRequired: true,
        logo: null,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.log(boxName);
    cy.log(boxKey);
  });
  it("Changing box 3 settings", () => {
    cy.request({
      method: "PUT",
      headers: {
        Cookie: cookie,
      },
      url: "/api/box",
      body: {
        email: null,
        name: `${boxName}+test`,
        key: boxKey,
        picture: "cup_one",
        usePost: false,
        useCashLimit: true,
        cashLimit: 1,
        cashLimitCurrency: "kzt",
        useWish: false,
        useCircleDraw: null,
        isInviteAfterDraw: null,
        isArchived: null,
        createAdminCard: null,
        isCreated: true,
        useNames: false,
        isPhoneRequired: false,
        logo: null,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.nested.property('box.name').and.eq(`${boxName}+test`);//Проверка, что имя коробоки изменено
      expect(response.body).to.have.nested.property('box.cashLimit').and.eq(1);//Проверка, что лимит изменен

    });
  });
  it("Delete Box 3", () => {
    cy.request({
      method: "DELETE",
      headers: {
        Cookie: cookie,
      },
      url: `/api/box/${boxKey}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it("Creating box with invalid data", () => {
    cy.request({
      method: "POST",
      headers: {
        Cookie: cookie,
      },
      url: "/api/box",
      failOnStatusCode: false,
      body: {
        email: null,
        name: "",
        key: boxKey,
        picture: "cup_one",
        usePost: true,
        useCashLimit: true,
        cashLimit: 999999,
        cashLimitCurrency: "uah",
        useWish: true,
        useCircleDraw: null,
        isInviteAfterDraw: null,
        isArchived: null,
        createAdminCard: null,
        isCreated: true,
        useNames: true,
        isPhoneRequired: true,
        logo: null,
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});
