# Requirements Document

## Introduction

HRMS Lite is a simple, internal HR management system designed for an internship assessment. The system supports a single admin user managing employee records and daily attendance tracking. The system prioritizes simplicity, stability, and beginner-friendly code without authentication or authorization requirements.

## Glossary

- **System**: The HRMS Lite backend application
- **Employee**: A person whose information is stored in the system
- **Attendance_Record**: A daily record indicating whether an employee was present or absent
- **Admin**: The single user who operates the system (no authentication required)
- **Employee_ID**: A unique identifier for each employee in the system

## Requirements

### Requirement 1: Employee Creation

**User Story:** As an admin, I want to add new employees to the system, so that I can maintain a record of all staff members.

#### Acceptance Criteria

1. WHEN the admin provides valid employee information (name, email, department, position), THE System SHALL create a new Employee record
2. WHEN the admin provides an email that already exists, THE System SHALL reject the creation and return an error message
3. WHEN the admin provides incomplete employee information, THE System SHALL reject the creation and return a validation error
4. WHEN an Employee is created, THE System SHALL assign a unique Employee_ID automatically

### Requirement 2: Employee Retrieval

**User Story:** As an admin, I want to view all employees in the system, so that I can see the complete list of staff members.

#### Acceptance Criteria

1. WHEN the admin requests all employees, THE System SHALL return a list of all Employee records
2. WHEN no employees exist in the system, THE System SHALL return an empty list
3. WHEN returning Employee records, THE System SHALL include all employee information (ID, name, email, department, position)

### Requirement 3: Employee Deletion

**User Story:** As an admin, I want to delete employees from the system, so that I can remove staff members who are no longer with the organization.

#### Acceptance Criteria

1. WHEN the admin provides a valid Employee_ID, THE System SHALL remove that Employee from the database
2. WHEN the admin provides an invalid Employee_ID, THE System SHALL return an error message
3. WHEN an Employee is deleted, THE System SHALL also remove all associated Attendance_Records for that employee

### Requirement 4: Attendance Recording

**User Story:** As an admin, I want to mark daily attendance for employees, so that I can track who is present or absent each day.

#### Acceptance Criteria

1. WHEN the admin marks attendance with a valid Employee_ID, date, and status (Present/Absent), THE System SHALL create an Attendance_Record
2. WHEN the admin attempts to mark attendance for the same Employee on the same date twice, THE System SHALL update the existing record instead of creating a duplicate
3. WHEN the admin provides an invalid Employee_ID, THE System SHALL reject the attendance marking and return an error
4. WHEN the admin provides an invalid status value, THE System SHALL reject the attendance marking and return a validation error

### Requirement 5: Attendance Retrieval

**User Story:** As an admin, I want to view attendance records for a specific employee, so that I can review their attendance history.

#### Acceptance Criteria

1. WHEN the admin requests attendance records for a valid Employee_ID, THE System SHALL return all Attendance_Records for that employee
2. WHEN the admin requests attendance records for an invalid Employee_ID, THE System SHALL return an error message
3. WHEN returning Attendance_Records, THE System SHALL include the date and status for each record
4. WHEN an Employee has no attendance records, THE System SHALL return an empty list

### Requirement 6: Database Connection

**User Story:** As a developer, I want the system to connect to MongoDB, so that data persists across application restarts.

#### Acceptance Criteria

1. WHEN the System starts, THE System SHALL establish a connection to MongoDB using Mongoose
2. IF the database connection fails, THEN THE System SHALL log an error message and exit gracefully
3. WHEN the System is running, THE System SHALL maintain the database connection for all operations

### Requirement 7: API Structure

**User Story:** As a developer, I want a RESTful API structure, so that the frontend can easily interact with the backend.

#### Acceptance Criteria

1. THE System SHALL expose RESTful endpoints for all employee and attendance operations
2. THE System SHALL use appropriate HTTP methods (GET, POST, DELETE) for each operation
3. THE System SHALL return appropriate HTTP status codes (200, 201, 400, 404, 500) based on operation results
4. THE System SHALL return responses in JSON format

### Requirement 8: Error Handling

**User Story:** As a developer, I want consistent error handling, so that issues can be easily identified and debugged.

#### Acceptance Criteria

1. WHEN an error occurs during any operation, THE System SHALL return a JSON response with an error message
2. WHEN validation fails, THE System SHALL return a 400 status code with details about the validation error
3. WHEN a resource is not found, THE System SHALL return a 404 status code with an appropriate message
4. WHEN a server error occurs, THE System SHALL return a 500 status code and log the error details
