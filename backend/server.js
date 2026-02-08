// Load .env file first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Enable CORS for all origins
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Connect to DB
connectDB();

const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'HRMS Lite API is running' });
});

app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (error) => {
  console.error(`Failed to start server: ${error.message}`);
  process.exit(1);
});
