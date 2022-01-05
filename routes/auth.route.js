const router = require("express").Router();

const {
  registerUser,
  loginUser,
  getNewAccessToken,
  logoutUser,
} = require("../controller/auth.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refreshtoken", getNewAccessToken);
router.delete("/logout", logoutUser);

module.exports = router;
