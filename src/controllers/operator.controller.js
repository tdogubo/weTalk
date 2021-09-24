const axios = require("axios");
const getToken = require("../models/token");

async function getOperator(req, res) {
  let { countryisocode, phoneNumber } = req.body;
  let token = await getToken();
  if (!countryisocode || !phoneNumber) {
    return res.sendStatus(400);
  }
  let headers = {
    Accept: "application/com.reloadly.topups-v1+json",
    Authorization: `Bearer ${token}`,
  };
  try {
    let response = await axios({
      method: "GET",
      url: `https://topups.reloadly.com/operators/auto-detect/phone/${phoneNumber}/countries/${countryisocode}`,
      headers: headers,
    });
    response = response.data;
    return res.status(200).json({ data: response });
  } catch (err) {
    return res.status(401).json(err);
  }
}

module.exports = getOperator;
