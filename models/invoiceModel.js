const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerPhoneNo: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    mobileIssues: {
      type: [String],
      required: true,
    },
    orderOn: {
      type: Date,
      required: true,
    },
    orderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
