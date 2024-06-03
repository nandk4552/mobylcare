const invoiceModel = require("../models/invoiceModel");

// Controller to get all invoices
const getInvoices = async (req, res) => {
  try {
    const invoices = await invoiceModel.find({}).sort({createdAt: -1});
    res.status(200).json({ invoices });
  } catch (error) {
    res.status(500).json({ message: "Error fetching invoices", error });
  }
};

module.exports = {
  getInvoices,
};
