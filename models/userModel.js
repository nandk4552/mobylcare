const mongoose = require("mongoose");

//user schema object
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    usertype: {
      type: String,
      required: [true, "user type is required"],
      default: "employee",
      enum: ["admin", "employee"],
    },
    profile: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGTMiqYNrUAciUJyeOwbTgWIqFAqiCV9pfrAUDDGvaCMO65r2pzECyfCbTbWlQBG90cZI&usqp=CAU",
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
    otp: {
      type: String,
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("User", userSchema);
