const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    costPrice: {
      type: Number,
      required: true,
    },
    itemCode: {
      type: String,
      required: [true, "Item code is required!"],
      unique: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
    takenBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },
    takenAt: {
      type: Date,
      default: null,
    },
    branch: {
      type: String,
      required: [true, "Branch is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);
