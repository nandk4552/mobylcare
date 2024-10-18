const customerModel = require("../models/customerModel");
const extractCustomerInfo = require("../utils/extractCustomerInfo");

const extractCustomerInfoController = async (req, res) => {
  try {
    await extractCustomerInfo();
    res
      .status(200)
      .send("Customer information extracted and saved successfully!");
  } catch (error) {
    res.status(500).send("Failed to extract and save customer information.");
  }
};

const getAllCustomerController = async (req, res) => {
  try {
    const customers = await customerModel.find({}).sort({ createdAt: -1 });
    if (!customers) {
      return res.status(404).send({
        success: false,
        message: "Customers not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "All customers fetched successfully",
      customers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all customer API",
      error,
    });
  }
};

const sendWhatsAppMsgController = async (req, res) => {
  const { phoneNumber } = req.body;
  const apiUrl = "https://graph.facebook.com/v19.0/108695218686380/messages";
  const token = process.env.WP_TOKEN; // Replace with your access token

  const data = {
    messaging_product: "whatsapp",
    to: phoneNumber,
    type: "template",
    template: {
      name: "testonlu",
      language: {
        code: "en",
      },
    },
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(apiUrl, data, config);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addCustomerController = async (req, res) => {
  try {
    const { name, phoneNo } = req.body;
    if (!name || !phoneNo) {
      return res.status(404).send({
        success: false,
        message: "Name and phone number are required",
      });
    }
    const newCustomer = new customerModel({
      name,
      phoneNo,
    });
    if (!newCustomer) {
      return res.status(404).send({
        success: false,
        message: "Error in creating adding customer obj",
      });
    }
    await newCustomer.save();

    return res.status(200).send({
      success: true,
      message: "Customer added successfully",
      newCustomer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in adding customer API",
      error,
    });
  }
};
const updateCustomerController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "customer id not found",
      });
    }
    const { name, phoneNo } = req.body;

    const updatedCustomer = await customerModel.findByIdAndUpdate(
      id,
      { name, phoneNo },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).send({
        success: false,
        message: "Error in updating customer details",
      });
    }
    await updatedCustomer.save();

    return res.status(200).send({
      success: true,
      message: "Customer updated successfully",
      updatedCustomer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in updating customer API",
      error,
    });
  }
};

const deleteCustomerController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "customer id not found",
      });
    }

    const isExist = await customerModel.findById(id);

    if (!isExist) {
      return res.status(500).send({
        success: false,
        message: "Internal Server Error",
      });
    }
    await customerModel.findByIdAndDelete(id);

    return res.status(200).send({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in deleting customer API",
      error,
    });
  }
};

const getCustomerByPhoneNumber = async (req, res) => {
  try {
    const { phoneNo } = req.params;
    if (!phoneNo) {
      return res
        .status(400)
        .json({ message: "Customer phone number is required" });
    }
    const customer = await customerModel.findOne({ phoneNo: phoneNo });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.json({ name: customer?.name });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Server error",
      error: error?.message || "Error in fetching get customer by phone number",
    });
  }
};
module.exports = {
  extractCustomerInfoController,
  getAllCustomerController,
  sendWhatsAppMsgController,
  addCustomerController,
  updateCustomerController,
  deleteCustomerController,
  getCustomerByPhoneNumber,
};
