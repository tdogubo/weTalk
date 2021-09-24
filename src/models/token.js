const axios = require("axios");
require("dotenv").config();

async function getToken() {
  try {
    let response = await axios({
      method: "POST",
      url: "https://auth.reloadly.com/oauth/token",
      header: {
        "content-type": "application/json",
      },
      data: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "client_credentials",
        audience: "https://topups.reloadly.com",
      },
    });
    let data = response.data;
    let token = data.access_token;
    let expiry_date = data.expires_in;
    if (expiry_date === "00000") {
      getToken();
    }
    return Promise.resolve(token);
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = getToken;
