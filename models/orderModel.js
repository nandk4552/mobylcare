const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    orderOn: {
      type: String,
      required: [true, "Ordered on is required!"],
    }, // Order date, default to current date
    customerName: {
      type: String,
      required: [true, "Customer Name is required!"],
    }, // Customer Name, required
    customerPhoneNo: {
      type: String,
      required: [true, "Customer phone no is required!"],
    }, // Customer Phone Number, required
    phoneModel: {
      type: String,
      required: [true, "Phone Model is required!"],
    }, // Phone Model, required
    mobileIssues: {
      type: [String],
      required: [true, "Mobile issues are required!"],
    },
    simCardAndMemoryCard: {
      // Sim card & Memory card, required with options
      type: [String],
      enum: [
        "No sim & memory card",
        "Jio",
        "Airtel",
        "VI",
        "BSNL",
        "Memory card",
      ],
      required: [true, "Sim card & memory card selection is required!"],
    },
    phonePassword: {
      type: String,
    }, // Phone Password, optional
    boxNo: {
      type: String,
      required: [true, "Box No is required!"],
    }, // Box Number, required
    receivedBy: {
      type: String,
      enum: ["Aman Singh", "Santosh Singh", "Shubham"],
      required: [true, "Received By is required!"],
    }, // Received By, required
    empOrderStatus: {
      type: String,
      enum: ["Completed", "Pending", "Not Possible"],
      required: [true, "EMP Order Status is required!"],
    }, // EMP Order Status, required
    totalAmount: {
      type: Number,
      required: [true, "Total Amount is required!"],
    }, // Total Amount in ₹, required
    advanceAmount: {
      type: Number,
      required: [true, "Advance Amount is required!"],
    }, // Advance Amount in ₹, required
    dueAmount: {
      type: Number,
    }, // Due Amount in ₹, required
    selectBranch: {
      type: String,
      enum: ["BS", "DS"],
      required: [true, "Branch selection is required!"],
    }, // Selected Branch, required
    customerResponse: {
      // Customer Response
      type: String,
      enum: ["Delivered", "No Response"],
    },
    deliveredBy: {
      type: String,
      enum: ["Aman Singh", "Santosh Singh", "Shubham"],
    }, // Delivered By, optional
    orderCompletedOn: {
      type: String,
    }, // Order Completed On date, optional
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
