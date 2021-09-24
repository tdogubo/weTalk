const request = require("supertest");
const app = require("../app");

describe("Test POST /operator", () => {
  test("should return", async () => {
    const response = await request(app)
      .post("/operator")
      .send({ countryisocode: "NG", phoneNumber: "0701236478" })
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
