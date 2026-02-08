# HRMS Lite

A full-stack Human Resource Management System developed as an internship assessment project. This application provides essential employee management and attendance tracking functionality with a modern, responsive interface.

## Project Overview

HRMS Lite is a comprehensive web application designed to streamline employee management and attendance tracking processes. The system allows organizations to efficiently manage employee records and monitor daily attendance with an intuitive user interface.

## Tech Stack Used

### Frontend
- React 18
- Vite
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CORS

### Database
- MongoDB Atlas (Cloud Database)

### Deployment
- Frontend: Vercel
- Backend: Render

## Core Features

### Employee Management
- Add new employees with comprehensive details (Employee ID, Name, Email, Department, Position)
- View all employees in a structured table format
- Delete employee records with confirmation
- Unique employee ID validation
- Form validation and error handling
- Responsive employee directory with scrollable interface
- Action menu for employee operations (Edit/Delete)

### Attendance Management
- Mark daily attendance for employees (Present/Absent)
- View attendance history for individual employees
- Prevent duplicate attendance entries for the same date
- Date validation to prevent future date attendance marking
- Real-time attendance record updates
- Comprehensive attendance tracking with date and status information

## Live Application URL

**Frontend**: https://hrms-lite-fullstack-x488.vercel.app/
**Backend API**: https://hrms-lite-fullstack-m1ki.onrender.com/

## GitHub Repository Link

**Repository**: https://github.com/rohit2212kr/hrms-lite-fullstack

## Steps to Run the Project Locally

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install required dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install required dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend application will run on `http://localhost:5173`

## API Endpoints

### Employee Management
- `POST /api/employees` - Create a new employee record
- `GET /api/employees` - Retrieve all employee records
- `DELETE /api/employees/:employeeId` - Delete a specific employee record

### Attendance Management
- `POST /api/attendance` - Mark attendance for an employee
- `GET /api/attendance/:employeeId` - Retrieve attendance records for a specific employee

## Assumptions or Limitations

### Assumptions
- Users have basic knowledge of web applications
- MongoDB Atlas connection is properly configured
- Environment variables are correctly set up
- Modern web browsers are used for optimal experience

### Limitations
- No user authentication system implemented
- Employee records cannot be edited (only add/delete operations)
- No advanced reporting or analytics features
- No email notifications for attendance
- Limited to basic CRUD operations
- No role-based access control
- No data backup or recovery mechanisms
- Single-tenant application (no multi-organization support)
