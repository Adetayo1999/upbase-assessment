const uploader = require("../config/multer");
const {
  getUserDetails,
  updateUserImage,
  getUserImage,
  deleteUserAccount,
  changePassword,
  updateUserProfile,
} = require("../controller/user.controller");
const verifyToken = require("../middlewares/verifyUser");
const router = require("express").Router();

router.get("/", verifyToken, getUserDetails);
router.post(
  "/updatePicture",
  [verifyToken, uploader.single("avatar")],
  updateUserImage
);
router.get("/:id/avatar", getUserImage);
router.delete("/deleteAccount", verifyToken, deleteUserAccount);
router.post("/changePassword", verifyToken, changePassword);
router.post("/updateProfile", verifyToken, updateUserProfile);

module.exports = router;
