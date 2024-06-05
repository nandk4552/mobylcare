const employeeModel = require("../models/employeeModel");
const fs = require("fs");
// Create a new employee
const createEmployee = async (req, res) => {
  try {
    const { name, role, phone, email, dateOfJoining, familyNumber, address } =
      req.fields;

    const { photoAttachment } = req.files;

    // Check if all fields are provided and not empty
    // * validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Employee name is required" });
      case !role:
        return res.status(500).send({ error: "Employee role is required" });
      case !phone:
        return res.status(500).send({ error: "Employee phone is required" });
      case !email:
        return res.status(500).send({ error: "Employee email is required" });
      case !dateOfJoining:
        return res
          .status(500)
          .send({ error: "Employee dateOfJoining is required" });
      case photoAttachment && photoAttachment.size > 10000000:
        return res.status(500).send({
          error:
            "Employee photoAttachment is required and should be less then 10mb",
        });
    }

    const newEmployee = new employeeModel({
      name,
      role,
      phone,
      email,
      dateOfJoining,
      familyNumber,
      address,
    });
    if (photoAttachment) {
      newEmployee.photoAttachment.data = fs.readFileSync(photoAttachment.path);
      newEmployee.photoAttachment.contentType = photoAttachment.type;
    }

    await newEmployee.save();
    res.status(201).send({
      successs: true,
      message: "Employee created successfully",
      newEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: true,
      message: "Error in adding employee item",
      error,
    });
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
    const { name, role, phone, email, dateOfJoining, familyNumber, address } =
      req.fields;

    const { photoAttachment } = req.files;

    // Find the employee by ID
    const employee = await employeeModel.findById(id);
    if (!employee) {
      return res.status(404).send({
        success: false,
        message: "Employee not found",
      });
    }

    // Update employee fields
    employee.name = name;
    employee.role = role;
    employee.phone = phone;
    employee.email = email;
    employee.dateOfJoining = dateOfJoining;
    employee.familyNumber = familyNumber;
    employee.address = address;

    // Update photo attachment if provided
    if (photoAttachment) {
      employee.photoAttachment = {
        data: fs.readFileSync(photoAttachment.path),
        contentType: photoAttachment.type,
      };
    }

    await employee.save();

    res.status(200).send({
      success: true,
      message: "Employee updated successfully",
      updatedEmployee: employee,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error updating employee",
      error: error.message,
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
// get emp list from db
const getEmployeesListController = async (req, res) => {
  try {
    const employees = await employeeModel.find({}).select("name");
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
    res.status(500).json({ error: error.message });
  }
};

const empPhotoController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Employee ID NOT FOUND",
      });
    }
    const employee = await employeeModel.findById(id).select("photoAttachment");
    if (employee && employee?.photoAttachment?.data) {
      // setting the content type of the photoAttachment
      res.set("Content-Type", employee?.photoAttachment?.contentType);
      // sending the photoAttachment
      return res.status(200).send(employee?.photoAttachment?.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting employee photo",
      error,
    });
  }
};
module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeesListController,
  empPhotoController,
};
