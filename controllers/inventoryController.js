const fs = require("fs");
const inventoryModel = require("../models/inventoryModel");

const createInventoryItem = async (req, res) => {
  try {
    const { itemName, quantity, costPrice, itemCode } = req.fields;
    // to destructer file eg: images
    const { photo } = req.files;

    // Check if all fields are provided and not empty
    // * validation
    switch (true) {
      case !itemName:
        return res.status(500).send({ error: "Name is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      case !costPrice:
        return res.status(500).send({ error: "costPrice is required" });
      case !itemCode:
        return res.status(500).send({ error: "itemCode is required" });
      case photo && photo.size > 10000000:
        return res
          .status(500)
          .send({ error: "Photo is required and should be less then 10mb" });
    }

    // Create new inventory item
    const newItem = new inventoryModel({
      itemName,
      quantity,
      costPrice,
      itemCode,
    });

    // If photo is provided, read and save it
    if (photo) {
      newItem.photo.data = fs.readFileSync(photo.path);
      newItem.photo.contentType = photo.type;
    }

    // Save to DB
    await newItem.save();
    res
      .status(201)
      .send({ success: true, message: "Item created successfully", newItem });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: true,
      message: "Error in creating inventory item",
      error,
    });
  }
};

// Get All Inventory Items
const getAllInventoryItems = async (req, res) => {
  try {
    // getting all product by slug withoud photo
    const inventories = await inventoryModel
      .find({})
      .select("-photo")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalCount: inventories.length,
      message: "Inventories fetched successfully",
      inventories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting inventories",
      error: error.message,
    });
  }
};

// Update Inventory Item
const updateInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Inventory Item ID NOT FOUND",
      });
    }

    const { itemName, quantity, costPrice, itemCode } = req.fields;
    // to destructer file eg: images
    const { photo } = req.files;
    // * validation
    switch (true) {
      case !itemName:
        return res.status(500).send({ error: "Name is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      case !costPrice:
        return res.status(500).send({ error: "costPrice is required" });
      case !itemCode:
        return res.status(500).send({ error: "itemCode is required" });
      case photo && photo.size > 10000000:
        return res
          .status(500)
          .send({ error: "Photo is required and should be less then 1mb" });
    }

    // * create new inventory itemm object by finding id from params and update the inventory
    const inventory = await inventoryModel.findByIdAndUpdate(
      id,
      { ...req.fields },
      { new: true }
    );
    //* validate: if photo is their then read the file and save it into DB
    if (photo) {
      inventory.photo.data = fs.readFileSync(photo.path);
      inventory.photo.contentType = photo.type;
    }

    //save into DB
    await inventory.save();

    res.status(200).send({
      message: "Inventory item updated successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update a inventory Item",
      error,
    });
  }
};

// Delete Inventory Item
const deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Inventory Item ID NOT FOUND",
      });
    }
    //getting product by id
    const inventory = await inventoryModel
      .findByIdAndDelete(id)
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "inventory deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting inventory",
      error,
    });
  }
};

const inventoryItemPhotoController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Inventory Item ID NOT FOUND",
      });
    }
    const inventory = await inventoryModel.findById(id).select("photo");
    if (inventory && inventory?.photo?.data) {
      // setting the content type of the photo
      res.set("Content-Type", inventory?.photo?.contentType);
      // sending the photo
      return res.status(200).send(inventory?.photo?.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting inventory photo",
      error,
    });
  }
};

// Upload Inventory Item Photo
const uploadItemPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { photo } = req.files;

    if (!id || !photo) {
      return res.status(400).send({ error: "Item ID and photo are required" });
    }

    if (photo.size > 10000000) {
      return res.status(400).send({ error: "Photo should be less than 10MB" });
    }

    const inventory = await inventoryModel.findById(id);
    if (!inventory) {
      return res.status(404).send({ error: "Item not found" });
    }

    inventory.photo.data = fs.readFileSync(photo.path);
    inventory.photo.contentType = photo.type;

    await inventory.save();
    res
      .status(200)
      .send({ success: true, message: "Photo uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to upload photo", error });
  }
};

// Delete Inventory Item Photo
const deleteItemPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await inventoryModel.findById(id);

    if (!inventory) {
      return res.status(404).send({ error: "Item not found" });
    }

    inventory.photo.data = undefined;
    inventory.photo.contentType = undefined;

    await inventory.save();
    res
      .status(200)
      .send({ success: true, message: "Photo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to delete photo", error });
  }
};

module.exports = {
  createInventoryItem,
  getAllInventoryItems,
  updateInventoryItem,
  deleteInventoryItem,
  inventoryItemPhotoController,
  uploadItemPhoto,
  deleteItemPhoto,
};
