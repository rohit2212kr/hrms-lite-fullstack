const Employee = require('../models/Employee');

// Add a new employee
const addEmployee = async (req, res) => {
  try {
    const { employeeId, name, email, department, position } = req.body;

    // Check if all required fields are provided
    if (!employeeId || !name || !email || !department || !position) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create new employee
    const employee = await Employee.create({
      employeeId,
      name,
      email,
      department,
      position
    });

    res.status(201).json(employee);
  } catch (error) {
    // Handle duplicate employeeId error
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Employee ID already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findOneAndDelete({ employeeId });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addEmployee,
  getAllEmployees,
  deleteEmployee
};
