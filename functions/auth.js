const axios = require("axios");

const getToken = (code) => {
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
  };

  const options = { headers: { accept: "application/json" } };

  return axios.post(
    "https://github.com/login/oauth/access_token",
    body,
    options
  );
};

exports.handler = async function (event) {
  try {
    const response = await getToken(event.queryStringParameters.code);
    return {
      statusCode: 200,
      body: JSON.stringify({ token: response.data.access_token }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
