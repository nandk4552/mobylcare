const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeesListController,
} = require("../controllers/employeeController");

// Create a new employee
router.post("/add", createEmployee);

// Get all employees
router.get("/get-all", getEmployees);

// Get a single employee by ID
router.get("/:id", getEmployeeById);

// Update an employee by ID
router.put("/:id", updateEmployee);

// Delete an employee by ID
router.delete("/:id", deleteEmployee);
//get only employee names || get || /api/v1/employees/list/names
router.get("/list/names", getEmployeesListController);

module.exports = router;

module.exports = router;
