const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
      // unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
