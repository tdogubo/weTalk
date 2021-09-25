const request = require("supertest");
const app = require("../app");

describe("Test POST /verify/:id", () => {
  test("should return", async () => {
    const response = await request(app)
      .post("/verify/nbhgvfcdxswq23w4e5t768u9ihj")
      .send({
        operatorId: "341",
        amount: "100",
        recipientNumber: "08102944117",
        recipientCountryCode: "NG",
      })
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
