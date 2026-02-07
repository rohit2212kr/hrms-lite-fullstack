# Implementation Plan: HRMS Lite Backend

## Overview

This implementation plan breaks down the HRMS Lite backend into discrete, incremental steps. Each task builds on previous work, starting with project setup, then implementing core models and controllers, and finally adding comprehensive testing. The approach ensures that functionality is validated early and integrated continuously.

## Tasks

- [x] 1. Initialize project structure and dependencies
  - Create backend directory with package.json
  - Install dependencies: express, mongoose, dotenv
  - Install dev dependencies: jest, supertest, fast-check, nodemon
  - Create basic folder structure: models/, controllers/, routes/, tests/
  - Create .env file for MongoDB connection string
  - _Requirements: 6.1, 7.1_

- [x] 2. Set up database connection and server entry point
  - [x] 2.1 Create database connection module
    - Write connectDB function using Mongoose
    - Add error handling for connection failures
    - _Requirements: 6.1, 6.2_
  
  - [x] 2.2 Create server.js with Express app initialization
    - Initialize Express app
    - Add JSON parsing middleware
    - Call connectDB and start server
    - Add graceful error handling for startup failures
    - _Requirements: 6.1, 6.2, 7.1_

- [x] 3. Implement Employee model and basic operations
  - [x] 3.1 Create Employee schema and model
    - Define schema with name, email, department, position, createdAt
    - Add unique constraint on email field
    - Add required validators for all fields
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  
  - [x] 3.2 Create employee controller with CRUD operations
    - Implement addEmployee function with validation
    - Implement getAllEmployees function
    - Implement deleteEmployee function
    - Add error handling for all operations
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2_
  
  - [x] 3.3 Create employee routes
    - Define POST /api/employees route
    - Define GET /api/employees route
    - Define DELETE /api/employees/:id route
    - Register routes in server.js
    - _Requirements: 7.1, 7.2_
  
  - [x]* 3.4 Write property test for employee creation
    - **Property 1: Employee Creation with Valid Data**
    - **Validates: Requirements 1.1, 1.4**
  
  - [x]* 3.5 Write property test for duplicate email rejection
    - **Property 2: Duplicate Email Rejection**
    - **Validates: Requirements 1.2**
  
  - [x]* 3.6 Write property test for required field validation
    - **Property 3: Required Field Validation**
    - **Validates: Requirements 1.3**
  
  - [x]* 3.7 Write unit test for empty employee list
    - Test GET /api/employees returns empty array when no employees exist
    - _Requirements: 2.2_

- [ ] 4. Checkpoint - Verify employee operations
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement Attendance model and operations
  - [x] 5.1 Create Attendance schema and model
    - Define schema with employeeId, date, status
    - Add enum constraint on status field (Present, Absent)
    - Add compound unique index on (employeeId, date)
    - Add reference to Employee model
    - _Requirements: 4.1, 4.2, 4.4_
  
  - [x] 5.2 Create attendance controller
    - Implement markAttendance function with upsert logic
    - Implement getAttendanceByEmployee function
    - Add validation for employee existence
    - Add validation for status values
    - Add error handling for all operations
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 5.4_
  
  - [x] 5.3 Create attendance routes
    - Define POST /api/attendance route
    - Define GET /api/attendance/:employeeId route
    - Register routes in server.js
    - _Requirements: 7.1, 7.2_
  
  - [x]* 5.4 Write property test for attendance creation
    - **Property 7: Attendance Creation with Valid Data**
    - **Validates: Requirements 4.1**
  
  - [x]* 5.5 Write property test for attendance upsert behavior
    - **Property 8: Attendance Upsert Behavior**
    - **Validates: Requirements 4.2**
  
  - [x]* 5.6 Write property test for invalid status validation
    - **Property 10: Invalid Status Validation**
    - **Validates: Requirements 4.4**
  
  - [x]* 5.7 Write unit test for employee with no attendance records
    - Test GET /api/attendance/:employeeId returns empty array
    - _Requirements: 5.4_

- [ ] 6. Implement cascade deletion
  - [ ] 6.1 Update deleteEmployee controller to cascade delete attendance
    - Add Attendance.deleteMany() call before employee deletion
    - Ensure both operations succeed or fail together
    - _Requirements: 3.3_
  
  - [ ]* 6.2 Write property test for cascade deletion
    - **Property 6: Cascade Deletion of Attendance**
    - **Validates: Requirements 3.3**

- [ ] 7. Checkpoint - Verify attendance and cascade operations
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Implement comprehensive error handling and validation
  - [ ] 8.1 Add consistent error response formatting
    - Create error response helper function
    - Update all controllers to use consistent error format
    - Ensure proper HTTP status codes (400, 404, 500)
    - _Requirements: 7.3, 8.1, 8.2, 8.3_
  
  - [ ]* 8.2 Write property test for employee retrieval completeness
    - **Property 4: Employee Retrieval Completeness**
    - **Validates: Requirements 2.1, 2.3**
  
  - [ ]* 8.3 Write property test for employee deletion success
    - **Property 5: Employee Deletion Success**
    - **Validates: Requirements 3.1**
  
  - [ ]* 8.4 Write property test for invalid employee ID rejection
    - **Property 9: Invalid Employee ID Rejection**
    - **Validates: Requirements 3.2, 4.3, 5.2**
  
  - [ ]* 8.5 Write property test for attendance retrieval completeness
    - **Property 11: Attendance Retrieval Completeness**
    - **Validates: Requirements 5.1, 5.3**
  
  - [ ]* 8.6 Write property test for HTTP status code correctness
    - **Property 12: HTTP Status Code Correctness**
    - **Validates: Requirements 7.3, 8.2, 8.3**
  
  - [ ]* 8.7 Write property test for JSON response format
    - **Property 13: JSON Response Format**
    - **Validates: Requirements 7.4, 8.1**

- [ ] 9. Final integration and testing
  - [ ]* 9.1 Write integration tests for complete workflows
    - Test full employee lifecycle (create, retrieve, delete)
    - Test full attendance workflow (create employee, mark attendance, retrieve, delete employee)
    - _Requirements: All_
  
  - [ ] 9.2 Add test scripts to package.json
    - Add "test" script for running all tests
    - Add "test:watch" script for development
    - Add "start" script for running server
    - Add "dev" script for nodemon development mode

- [ ] 10. Final checkpoint - Complete system verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties across random inputs
- Unit tests validate specific examples and edge cases
- The implementation follows a bottom-up approach: models → controllers → routes → tests
