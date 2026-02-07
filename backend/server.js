require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');


const app = express();


// Middleware
app.use(express.json());


// Connect to Database
connectDB();


// Routes
const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');


// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'HRMS Lite API is running' });
});


// API Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);


// Start server
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (error) => {
  console.error(`Failed to start server: ${error.message}`);
  process.exit(1);
});