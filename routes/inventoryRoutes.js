const express = require("express");
const {
  createInventoryItem,
  getAllInventoryItems,
  updateInventoryItem,
  deleteInventoryItem,
  inventoryItemPhotoController,
  uploadItemPhoto,
  deleteItemPhoto,
} = require("../controllers/inventoryController");
const formidable = require("express-formidable");

const router = express.Router();

//* Create Inventory Item
router.post("/add-item", formidable(), createInventoryItem);

//* Get All Inventory Items
router.get("/get-items", getAllInventoryItems);

//* Update Inventory Item
router.put("/update-item/:id", formidable(), updateInventoryItem);

//* Delete Inventory Item
router.delete("/delete-item/:id", deleteInventoryItem);

// * get inventory item photo || GET || api/v1/inventory/item-photo/:id
router.get("/item-photo/:id", inventoryItemPhotoController);

// * upload inventory item photo || POST || api/v1/inventory/upload-photo/:id
router.post("/upload-photo/:id", formidable(), uploadItemPhoto);

// * delete inventory item photo || DELETE || api/v1/inventory/delete-photo/:id
router.delete("/delete-photo/:id", deleteItemPhoto);

module.exports = router;
