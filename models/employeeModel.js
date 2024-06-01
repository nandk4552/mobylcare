const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Employee name is required!"],
    },
    role: {
      type: String,
      required: [true, "Employee role is required!"],
      enum: ["Admin", "Employee"],
    },
    phone: {
      type: String,
      required: [true, "Employee phone number is required!"],
    },
    email: {
      type: String,
      required: [true, "Employee email is required!"],
      unique: true,
    },
    dateOfJoining: {
      type: Date,
      required: [true, "Date of joining is required!"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
