/// <reference types="Cypress" />
const mainData = require("../fixtures/example.json");
import { faker } from "@faker-js/faker";
describe("Actions With Boxes", () => {
  let cookie =
    "connect.sid=s%3AbKbWYkZrYgqwWMexWZxX-PzynxVhriNV.KzfzMTebXrX%2BJohOBjQ9H7pBZd8ATeBZ5B8pkoGnMsI; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwMDAwMTMsImlhdCI6MTY3Mjc3NzI3MSwiZXhwIjoxNjcyNzgwODcxfQ.oQtUk4mPVBz4rTz1McwSRF1pUwuTdEnx_4uy2gxznmk; refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwMDAwMTMsImlhdCI6MTY3Mjc3NzI3MSwiZXhwIjoxNjcyNzg0NDcxfQ.UIpOeTVXdmYKHEobMdHZdANP9Wqc1El3Z-MSKdvOYI0";
  let boxName = faker.animal.type();
  let boxKey = faker.internet.password(4);

  //новый тест через API
  it("Create Box", () => {
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

  it("Creating box with all fields filled in", () => {
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
  it("Creating box with with max. cashLimit", () => {
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
  it("Changing box settings", () => {
    cy.request({
      method: "PUT",
      headers: {
        Cookie: cookie,
      },
      url: "/api/box",
      body: {
        email: null,
        name: boxName,
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
});
