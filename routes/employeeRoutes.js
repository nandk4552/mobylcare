const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeesListController,
  empPhotoController,
} = require("../controllers/employeeController");
const formidable = require("express-formidable");

//* Create a new employee
router.post("/add", formidable(), createEmployee);

// * get emp  photo || GET || /api/v1/employees/emp-photo/:id
router.get("/emp-photo/:id", empPhotoController);

// Get all employees
router.get("/get-all", getEmployees);

// Get a single employee by ID
router.get("/:id", getEmployeeById);

// Update an employee by ID
router.put("/update/:id", formidable(), updateEmployee);

//* Delete an employee by ID
router.delete("/:id", deleteEmployee);

//* get only employee names || get || /api/v1/employees/list/names
router.get("/list/names", getEmployeesListController);

module.exports = router;

module.exports = router;
