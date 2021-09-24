const express = require("express");
const cors = require("cors");
require("dotenv").config();

const getOperator = require("./controllers/operator.controller");
const getCountries = require("./controllers/countries.controller");
const airtimeTopup = require("./controllers/payment.controller");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/countries", getCountries);
app.post("/operator", getOperator);
app.post("/verify/:id", airtimeTopup);

module.exports = app;
