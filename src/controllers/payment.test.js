const request = require("supertest");
const app = require("../app");

describe("Test POST /verify", () => {
  test("should return", async () => {
    const response = await request(app)
      .post("/verify")
      .send({
        operatorId: "341",
        amount: "100",
        recipientNumber: "08102944117",
        recipientCountryCode: "NG",
        transactionRef: "2509533"
      })
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
