const request = require("supertest");
const server = require("../api/server");

describe("jokes-router.js", () => {
  describe("GET /", () => {
    it("returns 400 not authorized", () => {
      return request(server)
        .get("/api/jokes")
        .then((res) => {
          expect(res.status).toBe(400);
        });
    });
  });
});
