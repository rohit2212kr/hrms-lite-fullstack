# HRMS Lite Frontend

Simple React frontend for HRMS Lite employee and attendance management system.

## Features

### Employee Management
- Add new employees
- View all employees
- Delete employees

### Attendance Management
- Mark attendance for employees
- View attendance records by employee ID

## Prerequisites

- Node.js installed
- Backend server running on port 5000

## Installation

```bash
npm install
```

## Running the Application

```bash
npm run dev
```

The application will start on http://localhost:3000

## Usage

### Employee Management
1. Make sure the backend server is running on port 5000
2. Start the frontend development server
3. Open http://localhost:3000 in your browser
4. Use the form to add new employees
5. View the employee list below the form
6. Click "Delete" to remove an employee

### Attendance Management
1. Scroll down to the "Attendance Management" section
2. Use the "Mark Attendance" form to record attendance:
   - Enter Employee ID
   - Select Date
   - Choose Status (Present/Absent)
3. Use the "View Attendance Records" section to search:
   - Enter Employee ID
   - Click "Search Attendance"
   - View all attendance records for that employee

## API Endpoints Used

### Employee APIs
- GET /api/employees - Fetch all employees
- POST /api/employees - Add new employee
- DELETE /api/employees/:employeeId - Delete employee

### Attendance APIs
- POST /api/attendance - Mark attendance
- GET /api/attendance/:employeeId - Get attendance records
