import { useState, useEffect } from 'react'
import EmployeeForm from './components/EmployeeForm'
import EmployeeList from './components/EmployeeList'
import AttendanceForm from './components/AttendanceForm'
import AttendanceView from './components/AttendanceView'
import axios from 'axios'

// Base URL for deployed backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://hrms-lite-fullstack-m1ki.onrender.com';

console.log('API_BASE_URL:', API_BASE_URL);

function App() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeSection, setActiveSection] = useState('employees')
  const [attendanceRefreshTrigger, setAttendanceRefreshTrigger] = useState(null)

  // Scroll to section helper
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // fetch employees on component mount
  const fetchEmployees = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await axios.get(`${API_BASE_URL}/api/employees`)
      setEmployees(response.data)
    } catch (err) {
      setError('Failed to fetch employees')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // add new employee to list
  const addEmployee = async (employeeData) => {
    try {
      setError('')
      const response = await axios.post(`${API_BASE_URL}/api/employees`, employeeData)
      setEmployees([...employees, response.data])
      return { success: true }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to add employee'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    }
  }

  // delete employee with confirmation
  const deleteEmployee = async (employeeId) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return
    }

    try {
      setError('')
      await axios.delete(`${API_BASE_URL}/api/employees/${employeeId}`)
      setEmployees(employees.filter(emp => emp.employeeId !== employeeId))
    } catch (err) {
      setError('Failed to delete employee')
      console.error(err)
    }
  }

  // mark attendance for employee
  const markAttendance = async (attendanceData) => {
    try {
      await axios.post(`${API_BASE_URL}/api/attendance`, attendanceData)
      return { success: true }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to mark attendance'
      return { success: false, error: errorMsg }
    }
  }

  // fetch attendance records for specific employee
  const fetchAttendance = async (employeeId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/attendance/${employeeId}`)
      return { success: true, data: response.data }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to fetch attendance'
      return { success: false, error: errorMsg }
    }
  }

  // Handle attendance marked callback
  const handleAttendanceMarked = (employeeId) => {
    setAttendanceRefreshTrigger(employeeId)
    // Reset trigger after a short delay to allow for future refreshes
    setTimeout(() => setAttendanceRefreshTrigger(null), 100)
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-brand">
          <h1>HRMS Lite</h1>
          <span>Human Resource Management System</span>
        </div>
        <div className="nav-links">
          <button 
            className={`nav-link ${activeSection === 'employees' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('employees')
              scrollToSection('employees-section')
            }}
          >
            Employees
          </button>
          <button 
            className={`nav-link ${activeSection === 'attendance' ? 'active' : ''}`}
            onClick={() => {
              setActiveSection('attendance')
              scrollToSection('attendance-section')
            }}
          >
            Attendance
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {error && <div className="error-banner">{error}</div>}
        
        {/* Employee Management Section */}
        <section id="employees-section" className="content-section">
          <div className="section-title">
            <h2>Employee Management</h2>
            <p>Manage your organization's employee records</p>
          </div>
          
          <div className="cards-container">
            <div className="card">
              <div className="card-header">
                <h3>Add New Employee</h3>
                <p>Register a new employee in the system</p>
              </div>
              <div className="card-content">
                <EmployeeForm onAddEmployee={addEmployee} />
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Employee Directory</h3>
                <p>View and manage all registered employees</p>
              </div>
              <div className="card-content">
                <EmployeeList 
                  employees={employees} 
                  loading={loading}
                  onDeleteEmployee={deleteEmployee}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Attendance Management Section */}
        <section id="attendance-section" className="content-section">
          <div className="section-title">
            <h2>Attendance Management</h2>
            <p>Track and manage employee attendance records</p>
          </div>
          
          <div className="cards-container">
            <div className="card">
              <div className="card-header">
                <h3>Mark Attendance</h3>
                <p>Record daily attendance for employees</p>
              </div>
              <div className="card-content">
                <AttendanceForm 
                  onMarkAttendance={markAttendance} 
                  onAttendanceMarked={handleAttendanceMarked}
                />
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Attendance History</h3>
                <p>View attendance records for any employee</p>
              </div>
              <div className="card-content">
                <AttendanceView 
                  onFetchAttendance={fetchAttendance}
                  refreshTrigger={attendanceRefreshTrigger}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>HRMS Lite © 2024 - Built for efficient employee and attendance management</p>
      </footer>
    </div>
  )
}

export default App
