# Design Document: HRMS Lite Backend

## Overview

The HRMS Lite backend is a RESTful API built with Node.js, Express, and MongoDB. It provides endpoints for managing employees and their attendance records. The system follows a simple three-layer architecture: routes, controllers, and models. The design prioritizes simplicity and readability, making it suitable for an internship assessment.

The backend exposes the following core functionality:
- Employee CRUD operations (Create, Read, Delete)
- Attendance marking and retrieval
- Automatic cascade deletion of attendance records when employees are removed

## Architecture

The application follows a standard MVC-inspired architecture with three main layers:

1. **Routes Layer**: Defines API endpoints and maps them to controller functions
2. **Controller Layer**: Contains business logic and orchestrates data operations
3. **Model Layer**: Defines data schemas and interacts with MongoDB through Mongoose

```
┌─────────────────┐
│   Express App   │
└────────┬────────┘
         │
    ┌────▼────┐
    │ Routes  │
    └────┬────┘
         │
    ┌────▼────────┐
    │ Controllers │
    └────┬────────┘
         │
    ┌────▼────┐
    │ Models  │
    └────┬────┘
         │
    ┌────▼────────┐
    │  MongoDB    │
    └─────────────┘
```

## Components and Interfaces

### 1. Server Entry Point (server.js)

The main application file that:
- Initializes Express application
- Connects to MongoDB
- Registers middleware (JSON parsing, CORS if needed)
- Registers route handlers
- Starts the HTTP server

**Key Functions:**
- `connectDB()`: Establishes MongoDB connection using Mongoose
- `app.listen(port)`: Starts the Express server on specified port

### 2. Employee Model (models/Employee.js)

Defines the Employee schema and model using Mongoose.

**Schema Fields:**
- `name`: String, required - Employee's full name
- `email`: String, required, unique - Employee's email address
- `department`: String, required - Department name
- `position`: String, required - Job position/title
- `createdAt`: Date, default: Date.now - Timestamp of record creation

**Model Methods:**
- Standard Mongoose methods: `save()`, `find()`, `findById()`, `findByIdAndDelete()`

### 3. Attendance Model (models/Attendance.js)

Defines the Attendance schema and model using Mongoose.

**Schema Fields:**
- `employeeId`: ObjectId, required, ref: 'Employee' - Reference to Employee
- `date`: Date, required - Date of attendance record
- `status`: String, required, enum: ['Present', 'Absent'] - Attendance status

**Indexes:**
- Compound unique index on `(employeeId, date)` to prevent duplicate records for same day

**Model Methods:**
- Standard Mongoose methods: `save()`, `find()`, `deleteMany()`

### 4. Employee Controller (controllers/employeeController.js)

Handles business logic for employee operations.

**Functions:**

`addEmployee(req, res)`
- Extracts employee data from request body
- Validates required fields
- Creates new Employee document
- Returns created employee or error response

`getAllEmployees(req, res)`
- Retrieves all employees from database
- Returns array of employee documents

`deleteEmployee(req, res)`
- Extracts employee ID from request parameters
- Validates employee exists
- Deletes employee document
- Cascades deletion to all associated attendance records
- Returns success message or error response

### 5. Attendance Controller (controllers/attendanceController.js)

Handles business logic for attendance operations.

**Functions:**

`markAttendance(req, res)`
- Extracts employeeId, date, and status from request body
- Validates employee exists
- Validates status is 'Present' or 'Absent'
- Uses `findOneAndUpdate` with `upsert: true` to create or update attendance record
- Returns created/updated attendance record or error response

`getAttendanceByEmployee(req, res)`
- Extracts employee ID from request parameters
- Validates employee exists
- Retrieves all attendance records for that employee
- Sorts records by date (descending)
- Returns array of attendance records or error response

### 6. Routes (routes/employeeRoutes.js, routes/attendanceRoutes.js)

Define API endpoints and map them to controller functions.

**Employee Routes:**
- `POST /api/employees` → `addEmployee`
- `GET /api/employees` → `getAllEmployees`
- `DELETE /api/employees/:id` → `deleteEmployee`

**Attendance Routes:**
- `POST /api/attendance` → `markAttendance`
- `GET /api/attendance/:employeeId` → `getAttendanceByEmployee`

## Data Models

### Employee Document

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  department: String,
  position: String,
  createdAt: Date
}
```

**Constraints:**
- `email` must be unique across all employees
- All fields except `_id` and `createdAt` are required

### Attendance Document

```javascript
{
  _id: ObjectId,
  employeeId: ObjectId,
  date: Date,
  status: "Present" | "Absent"
}
```

**Constraints:**
- `employeeId` must reference a valid Employee document
- Combination of `(employeeId, date)` must be unique
- `status` must be either "Present" or "Absent"


## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Employee Creation with Valid Data

For any valid employee data (containing name, email, department, and position), creating an employee should result in a new record in the database with a unique ID and all provided fields preserved.

**Validates: Requirements 1.1, 1.4**

### Property 2: Duplicate Email Rejection

For any employee email that already exists in the database, attempting to create a new employee with that email should be rejected with an error response.

**Validates: Requirements 1.2**

### Property 3: Required Field Validation

For any employee data missing one or more required fields (name, email, department, or position), the creation attempt should be rejected with a validation error.

**Validates: Requirements 1.3**

### Property 4: Employee Retrieval Completeness

For any set of employees in the database, retrieving all employees should return exactly that set with all fields (ID, name, email, department, position) intact.

**Validates: Requirements 2.1, 2.3**

### Property 5: Employee Deletion Success

For any valid employee ID in the database, deleting that employee should result in the employee no longer being present in the database.

**Validates: Requirements 3.1**

### Property 6: Cascade Deletion of Attendance

For any employee with associated attendance records, deleting that employee should also remove all their attendance records from the database.

**Validates: Requirements 3.3**

### Property 7: Attendance Creation with Valid Data

For any valid attendance data (containing a valid employee ID, date, and status of Present or Absent), marking attendance should create a record in the database with all provided fields preserved.

**Validates: Requirements 4.1**

### Property 8: Attendance Upsert Behavior

For any employee and date, marking attendance twice should result in only one attendance record with the most recent status value (update, not duplicate).

**Validates: Requirements 4.2**

### Property 9: Invalid Employee ID Rejection

For any operation (attendance marking, attendance retrieval, employee deletion) using a non-existent employee ID, the system should reject the operation with an appropriate error response.

**Validates: Requirements 3.2, 4.3, 5.2**

### Property 10: Invalid Status Validation

For any attendance marking attempt with a status value other than "Present" or "Absent", the system should reject the operation with a validation error.

**Validates: Requirements 4.4**

### Property 11: Attendance Retrieval Completeness

For any employee with attendance records, retrieving attendance for that employee should return all records with date and status fields intact, sorted by date.

**Validates: Requirements 5.1, 5.3**

### Property 12: HTTP Status Code Correctness

For any API operation, the system should return appropriate HTTP status codes: 200/201 for success, 400 for validation errors, 404 for not found, and 500 for server errors.

**Validates: Requirements 7.3, 8.2, 8.3**

### Property 13: JSON Response Format

For any API response (success or error), the system should return valid JSON with appropriate structure (data for success, error message for failures).

**Validates: Requirements 7.4, 8.1**

## Error Handling

The application implements consistent error handling across all endpoints:

1. **Validation Errors (400)**:
   - Missing required fields
   - Invalid data types
   - Invalid enum values (e.g., status not "Present" or "Absent")
   - Duplicate email addresses

2. **Not Found Errors (404)**:
   - Employee ID does not exist
   - No records found for requested resource

3. **Server Errors (500)**:
   - Database connection failures
   - Unexpected runtime errors

**Error Response Format:**
```javascript
{
  error: "Error message describing what went wrong"
}
```

**Success Response Format:**
```javascript
{
  // For single resource
  data: { ...resource }
  
  // For collections
  data: [ ...resources ]
  
  // For deletion
  message: "Success message"
}
```

## Testing Strategy

The HRMS Lite backend will be tested using a dual approach combining unit tests and property-based tests.

### Unit Testing

Unit tests will focus on:
- Specific examples demonstrating correct behavior (e.g., creating an employee with specific data)
- Edge cases (e.g., empty employee list, employee with no attendance records)
- Integration points (e.g., database connection on startup)
- Specific error scenarios (e.g., database connection failure)

Unit tests will be written using Jest and Supertest for API endpoint testing.

### Property-Based Testing

Property-based tests will verify universal properties across many randomly generated inputs. We will use fast-check (a JavaScript property-based testing library) to implement these tests.

Each property test will:
- Run a minimum of 100 iterations with randomly generated data
- Reference the corresponding design document property
- Use the tag format: **Feature: hrms-lite-backend, Property N: [property text]**

Property tests will cover:
- Employee CRUD operations with random valid/invalid data
- Attendance marking and retrieval with random dates and statuses
- Error handling with random invalid inputs
- HTTP status code verification across random scenarios

### Test Organization

Tests will be organized as follows:
- `tests/employee.test.js` - Employee-related unit and property tests
- `tests/attendance.test.js` - Attendance-related unit and property tests
- `tests/integration.test.js` - Integration tests for cascade deletion and cross-feature behavior

### Testing Balance

We will avoid writing excessive unit tests since property-based tests handle comprehensive input coverage. Unit tests will focus on:
- Demonstrating correct behavior with concrete examples
- Testing specific edge cases that are important to document
- Testing integration scenarios between components

Property tests will handle:
- Verifying correctness across wide input ranges
- Catching unexpected edge cases through randomization
- Validating universal invariants hold for all inputs
