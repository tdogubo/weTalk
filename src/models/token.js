const axios = require("axios");

async function getToken() {
  //get access token from reloadly
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
        audience: "https://topups-sandbox.reloadly.com",
      },
    });
    let data = response.data;
    let token = data.access_token; //extract the access token from the data
    let expiry_date = data.expires_in;
    if (expiry_date === "00000") {
      getToken(); //check expiration of access token and reruns fucntion in case of expiration
    }
    return Promise.resolve(token);
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = getToken;
