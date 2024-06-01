const express = require("express");
const { registerController, loginController } = require("../controllers/authController");

const router = express.Router();

//routes
//* REGISTER || POST || api/v1/auth/register
router.post("/register", registerController);

//* REGISTER || POST ||  api/v1/auth/login
router.post("/login", loginController);


module.exports = router;
