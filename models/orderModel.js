const mongoose = require("mongoose");
const invoiceModel = require("./invoiceModel");

const orderSchema = new mongoose.Schema(
  {
    orderOn: {
      type: Date,
      required: [true, "Ordered on is required!"],
      default: Date.now,
    },
    customerName: {
      type: String,
      required: [true, "Customer Name is required!"],
    },
    customerPhoneNo: {
      type: String,
      required: [true, "Customer phone no is required!"],
    },
    phoneModel: {
      type: String,
      required: [true, "Phone Model is required!"],
    },
    mobileIssues: {
      type: [String],
      required: [true, "Mobile issues are required!"],
    },
    simCardAndMemoryCard: {
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
    },
    boxNo: {
      type: String,
      required: [true, "Box No is required!"],
    },
    receivedBy: {
      type: String,
      // enum: ["Aman Singh", "Santosh Singh", "Shubham"],
      required: [true, "Received By is required!"],
    },
    empOrderStatus: {
      type: String,
      enum: ["Completed", "Pending", "Not Possible"],
      required: [true, "EMP Order Status is required!"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total Amount is required!"],
    },
    advanceAmount: {
      type: Number,
      required: [true, "Advance Amount is required!"],
    },
    dueAmount: {
      type: Number,
    },
    selectBranch: {
      type: String,
      enum: ["BS", "DS"],
      required: [true, "Branch selection is required!"],
    },
    customerResponse: {
      type: String,
      enum: ["Delivered", "No Response"],
    },
    deliveredBy: {
      type: String,
      // enum: ["Aman Singh", "Santosh Singh", "Shubham"],
    },
    orderCompletedOn: {
      type: Date,
    },
  },
  { timestamps: true }
);

orderSchema.pre("save", async function (next) {
  if (
    this.isModified("empOrderStatus") &&
    this.empOrderStatus === "Completed"
  ) {
    console.log("Creating invoice for order:", this._id);
    const invoice = new invoiceModel({
      customerName: this.customerName,
      customerPhoneNo: this.customerPhoneNo,
      totalAmount: this.totalAmount,
      mobileIssues: this.mobileIssues,
      orderOn: this.orderOn,
      orderID: this._id,
    });
    await invoice.save();
    console.log("Invoice created successfully");
  }
  next();
});

orderSchema.methods.toJSON = function () {
  const obj = this.toObject();
  if (obj.orderOn) {
    obj.orderOn = obj.orderOn;
  }
  if (obj.orderCompletedOn) {
    obj.orderCompletedOn = obj.orderCompletedOn;
  }
  return obj;
};

module.exports = mongoose.model("Order", orderSchema);
