const axios = require("axios");
const getToken = require("../models/token");
require("dotenv").config();

async function paymentStatus(transactionRef) {
  try {
    let response = await axios({
      method: "GET",
      url: `https://api.flutterwave.com/v3/transactions/${transactionRef}/verify`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SEC_KEY}`,
      },
    });
    response = response.data;
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function airtimeTopup(req, res) {
  let transactionRef = req.params;
  try {
    const status = await paymentStatus(transactionRef);
    if (!status || status.status === "error") return res.status(401);

    let token = await getToken();

    let {
      operatorId,
      amount,
      recipientNumber,
      recipientCountryCode,
    } = req.body;
    let data = JSON.stringify({
      operatorId: `${operatorId}`,
      amount: `${amount}`,
      useLocalAmount: false,
      recipientPhone: {
        countryCode: `${recipientCountryCode}`,
        number: `${recipientNumber}`,
      },
    });

    let response = await axios({
      method: "POST",
      url: "https://topups.reloadly.com/topups",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/com.reloadly.topups-v1+json",
        "Content-Type": "application/json",
      },
      data: data,
    });

    response = response.data;
    return res.status(200).json({ response });
  } catch (error) {
    error = error.response.data;
    return res.status(400).json(error);
  }
}
module.exports = airtimeTopup;
