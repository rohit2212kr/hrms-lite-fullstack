const express = require('express');
const router = express.Router();
const {
  addEmployee,
  getAllEmployees,
  deleteEmployee
} = require('../controllers/employeeController');

// POST /api/employees - add new employee
router.post('/', addEmployee);

// GET /api/employees - get all employees
router.get('/', getAllEmployees);

// DELETE /api/employees/:employeeId - delete employee
router.delete('/:employeeId', deleteEmployee);

module.exports = router;
