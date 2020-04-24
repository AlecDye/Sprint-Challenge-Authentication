const request = require("supertest");
const express = require("express");
const server = require("../api/server.js");
const router = require("./auth-router.js");

describe("auth-router.js", function () {
  describe("POST /register", function () {
    it("return status 201 OK", async function () {
      const number = Date.now();
      let newUser = {
        username: `bob${number}`,
        password: "123pass",
      };
      const res = await request(server)
        .post("/api/auth/register")
        .send(newUser);
      expect(res.status).toBe(201);
    });
    it("return status 500 (name will already exist in db)", async function () {
      const newUser = {
        username: "bob",
        password: "123pass",
      };
      const res = await request(server)
        .post("/api/auth/register")
        .send(newUser);
      expect(res.status).toBe(500);
    });
  });
  describe("POST /login", function () {
    it("should return status 401 error", async function () {
      const nonUser = {
        username: "jeff",
        password: "123pass",
      };
      const res = await request(server).post("/api/auth/login").send(nonUser);
      expect(res.status).toBe(401);
    });
    it("should return status 200", async function () {
      const currentUser = {
        username: "bob",
        password: "123pass",
      };
      const res = await request(server)
        .post("/api/auth/login")
        .send(currentUser);
      expect(res.status).toBe(200);
    });
  });
});
