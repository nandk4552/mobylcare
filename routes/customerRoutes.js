// extractCustomerRoute.js
const axios = require("axios");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  extractCustomerInfoController,
  getAllCustomerController,
  sendWhatsAppMsgController,
  addCustomerController,
  updateCustomerController,
  deleteCustomerController,
} = require("../controllers/customerController");

//* EXTRACT CUSTOMER INFO || POST || api/v1/customer/extract-customers
router.post(
  "/extract-customers",
  authMiddleware,
  extractCustomerInfoController
);

//* GET ALL CUSTOMER || POST || api/v1/customer/get-all
router.get("/get-all", authMiddleware, getAllCustomerController);

//* SEND WHATSAPP MESSAGE FOR CUSTOMER || POST || api/v1/customer/whatsapp
router.post(
  "/whatsapp/send-message",
  authMiddleware,
  sendWhatsAppMsgController
);

//* ADD CUSTOMER || POST || api/v1/customer/add
router.post("/add", authMiddleware, addCustomerController);

//* UPDATE CUSTOMER || POST || api/v1/customer/:id
router.put("/:id", authMiddleware, updateCustomerController);

//* DELETE CUSTOMER || POST || api/v1/customer/:id
router.delete("/:id", authMiddleware, deleteCustomerController);

module.exports = router;
