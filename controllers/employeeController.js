const employeeModel = require("../models/employeeModel");

// Create a new employee
const createEmployee = async (req, res) => {
  try {
    const employee = new employeeModel(req.body);
    if (!employee) {
      return res.status(404).send({
        success: false,
        message: "Employee failed to add",
      });
    }
    await employee.save();
    res.status(201).send({
      successs: true,
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating employee", error });
  }
};

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.find({});
    if (!employees) {
      return res.status(404).send({
        success: false,
        message: "Employees not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Employees fetched successfully",
      employees,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error fetching employees",
      error,
    });
  }
};

// Get a single employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Employee ID not found",
      });
    }
    const employee = await employeeModel.findById(id);
    if (!employee) {
      return res.status(404).send({
        success: false,
        message: "Employee not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Employee fetched successfully",
      employee,
    });
  } catch (error) {
    res.status(400).json({ message: "Error fetching employee", error });
  }
};

// Update an employee by ID
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Employee ID not found",
      });
    }
    const { name, role, phone, email, dateOfJoining } = req.body;
    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      id,
      {
        name,
        role,
        phone,
        email,
        dateOfJoining,
      },
      {
        new: true,
      }
    );
    if (!updatedEmployee) {
      return res.status(400).sebd({
        success: false,
        message: "Employee not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Employee updated successfully",
      updatedEmployee,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error updating employee",
      error,
    });
  }
};

// Delete an employee by ID
const deleteEmployee = async (req, res) => {
  try {
    const employee = await employeeModel.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting employee", error });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
