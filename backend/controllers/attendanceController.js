const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

// Mark attendance for an employee
const markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    // Check if all required fields are provided
    if (!employeeId || !date || !status) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate status value
    if (status !== 'Present' && status !== 'Absent') {
      return res.status(400).json({ error: 'Status must be either Present or Absent' });
    }

    // Check if employee exists
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Use findOneAndUpdate with upsert to create or update attendance record
    const attendance = await Attendance.findOneAndUpdate(
      { employeeId, date: new Date(date) },
      { employeeId, date: new Date(date), status },
      { new: true, upsert: true }
    );

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get attendance records for an employee
const getAttendanceByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Check if employee exists
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Get all attendance records for the employee, sorted by date (descending)
    const attendanceRecords = await Attendance.find({ employeeId }).sort({ date: -1 });

    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  markAttendance,
  getAttendanceByEmployee
};
