const express = require('express');
const router = express.Router();
const {
  markAttendance,
  getAttendanceByEmployee
} = require('../controllers/attendanceController');

// POST /api/attendance - Mark attendance for an employee
router.post('/', markAttendance);

// GET /api/attendance/:employeeId - Get attendance records for an employee
router.get('/:employeeId', getAttendanceByEmployee);

module.exports = router;
