const { verify } = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) throw new Error("Authorization Required");

    const token = authorization.split(" ")[1];

    const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.id = decoded.id;
    next();
  } catch (err) {
    res.status(403).send({
      error: err.message,
    });
  }
};

module.exports = verifyToken;
