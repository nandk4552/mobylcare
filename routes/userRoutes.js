const express = require("express");

const {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteUserController,
  resetPasswordByOTPController,
  initiatePasswordResetController,
  userPhotoController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
//* GET USER || POST || api/v1/user/get-user
router.get("/get-user", authMiddleware, getUserController);

//* UPDATE USER || POST || api/v1/user/update-user
router.put("/update-user", authMiddleware, updateUserController);

//* UPDATE PASSWORD || POST || api/v1/user/update-user
router.post("/update-password", authMiddleware, updatePasswordController);

//* RESET USER PASSWORD  || POST || api/v1/user/reset-password
router.post("/reset-password", authMiddleware, resetPasswordController);

//* INITIATING PASSWORD RESET PROCESS || POST || api/v1/user/reset-otp-password/initiate
router.post("/reset-otp-password/initiate", initiatePasswordResetController);

//* RESET USER PASSWORD BY OTP  || POST || api/v1/user/reset-password-otp
router.post("/reset-password-otp", resetPasswordByOTPController);
//* DELETE USER  || POST || api/v1/user/delete-user
router.delete("/delete-user/:id", authMiddleware, deleteUserController);

// *GET PHOTO || GET \\ api/v1/user/user-photo/:id
// router.get(
//   "/user-photo/:uid",
//   authMiddleware,
//   formidable(),
//   userPhotoController
// );

module.exports = router;
