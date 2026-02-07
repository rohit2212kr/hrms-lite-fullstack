const express = require('express');
const router = express.Router();
const {
  markAttendance,
  getAttendanceByEmployee
} = require('../controllers/attendanceController');

// POST /api/attendance - mark attendance
router.post('/', markAttendance);

// GET /api/attendance/:employeeId - get employee attendance
router.get('/:employeeId', getAttendanceByEmployee);

module.exports = router;
