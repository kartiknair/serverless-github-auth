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

module.exports = (req, res) => {
  getToken(req.query.code)
    .then((response) => {
      res.status(200).json({ token: response.data.access_token });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
