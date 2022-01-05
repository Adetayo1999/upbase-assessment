const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const createAccessToken = (user) => {
  const payload = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
};

const createRefreshToken = (user) => {
  const payload = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "1y",
  });
};

const sendAccessToken = (res, token) => {
  res.send({
    token,
  });
};

const sendRereshToken = (res, token) => {
  res.cookie("refreshToken", token, {
    path: "/api/auth/refreshtoken",
    httpOnly: true,
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRereshToken,
};
