const express = require("express");
const { getInvoices } = require("../controllers/invoiceController");
const router = express.Router();

// Route to get all invoices
router.get("/get-invoices", getInvoices);

module.exports = router;
