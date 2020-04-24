const request = require("supertest");
const express = require("express");
const server = require("../api/server.js");
const router = require("./auth-router.js");

describe("auth-router.js", function () {
  describe("POST /register", function () {
    it("return status 201 OK", function () {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "Joe", password: "123pass" })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });
});
