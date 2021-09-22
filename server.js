const express = require("express");

const getOperator = require("./src/controllers/operator.controller");
const getCountries = require("./src/controllers/countries.controller");
const airtimeTopup = require("./src/controllers/payment.controller");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.listen(PORT, () => {
  console.log(`listening on ${PORT}...`);
});

app.get("/countries", getCountries);
app.post("/operator", getOperator);
app.post("/verify/:id", airtimeTopup);

