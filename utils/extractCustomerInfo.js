// extractCustomerInfo.js
const mongoose = require("mongoose");
const customerModel = require("../models/customerModel");
const orderModel = require("../models/orderModel");

const extractCustomerInfo = async () => {
  try {
    // Fetch all orders
    const orders = await orderModel.find();

    // Extract and transform customer information
    const customers = orders.map((order) => ({
      name: order.customerName,
      phoneNo: order.customerPhoneNo,
    }));

    // Remove duplicate customers based on phoneNo
    const uniqueCustomers = [];
    const phoneNoSet = new Set();
    for (const customer of customers) {
      if (!phoneNoSet.has(customer.phoneNo)) {
        phoneNoSet.add(customer.phoneNo);
        uniqueCustomers.push(customer);
      }
    }

    // Save unique customer information into the new collection
    await customerModel.insertMany(uniqueCustomers);

    console.log("Customer information extracted and saved successfully!");
  } catch (error) {
    console.error("Failed to extract and save customer information", error);
    throw error; // Ensure the error is propagated
  }
};

module.exports = extractCustomerInfo;
