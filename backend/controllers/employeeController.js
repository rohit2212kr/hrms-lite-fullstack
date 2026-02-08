const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');

// Add new employee
const addEmployee = async (req, res) => {
  try {
    const { employeeId, name, email, department, position } = req.body;

    // validate required fields
    if (!employeeId || !name || !email || !department || !position) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const employee = await Employee.create({
      employeeId,
      name,
      email,
      department,
      position
    });

    res.status(201).json(employee);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Employee ID already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Get all employees list
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete employee by ID
const deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Check if employee exists
    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Delete all attendance records for this employee
    await Attendance.deleteMany({ employeeId });

    // Delete the employee
    await Employee.findOneAndDelete({ employeeId });

    res.status(200).json({ message: 'Employee and related attendance records deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addEmployee,
  getAllEmployees,
  deleteEmployee
};
