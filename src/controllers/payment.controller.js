const axios = require("axios");
const getToken = require("../models/token");

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
  try {
    let token = await getToken();

    let {
      operatorId,
      amount,
      recipientNumber,
      recipientCountryCode,
      transactionRef,
    } = req.body;
    const status = await paymentStatus(transactionRef);
    if (status.status === "error") return res.sendStatus(400);
    let data = JSON.stringify({
      operatorId: `${operatorId}`,
      amount: `${amount}`,
      recipientPhone: {
        countryCode: `${recipientCountryCode}`,
        number: `${recipientNumber}`,
      },
    });

    let response = await axios({
      method: "POST",
      url: "https://topups-sandbox.reloadly.com/topups",
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
