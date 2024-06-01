const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address, answer } = req.body;
    //validation
    if (!username || !email || !password || !phone || !answer) {
      return res.status(404).send({
        success: false,
        message: "All fields are required",
      });
    }

    //check user if existing
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "User already registered please try to login",
      });
    }

    //hashing password
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

// ** LOGIN CONTROLLER **
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "All fields are required",
      });
    }

    //check if the user with email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    //check password || compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // create a jwt token to hash the user and data passed into the callback
    const token = JWT.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // clearing password
    user.password = undefined;

    // success message
    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
