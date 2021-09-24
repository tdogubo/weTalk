const request = require("supertest");
const app = require("../app");
const getToken = require("../models/token");



describe("Test GET /countries", () => {
  test("should return", async () => {
    const response = await request(app)
      .get("/countries")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
