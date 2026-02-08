const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

// Mark daily attendance for employee
const markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    // validate input fields
    if (!employeeId || !date || !status) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // check valid status
    if (status !== 'Present' && status !== 'Absent') {
      return res.status(400).json({ error: 'Status must be either Present or Absent' });
    }

    // validate date is not in the future
    const attendanceDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset time to start of day
    attendanceDate.setHours(0, 0, 0, 0); // reset time to start of day

    if (attendanceDate > today) {
      return res.status(400).json({ error: 'Attendance cannot be marked for a future date' });
    }

    // verify employee exists
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // upsert attendance record (create if not exists)
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

// Get attendance history for specific employee
const getAttendanceByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // verify employee exists
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // fetch all records sorted by latest first
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
