const express = require('express');
const router = express.Router();
const {
  addEmployee,
  getAllEmployees,
  deleteEmployee
} = require('../controllers/employeeController');

// POST /api/employees - Add a new employee
router.post('/', addEmployee);

// GET /api/employees - Get all employees
router.get('/', getAllEmployees);

// DELETE /api/employees/:employeeId - Delete an employee
router.delete('/:employeeId', deleteEmployee);

module.exports = router;
