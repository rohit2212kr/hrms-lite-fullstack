import { useState, useEffect } from 'react'
import EmployeeForm from './components/EmployeeForm'
import EmployeeList from './components/EmployeeList'
import AttendanceForm from './components/AttendanceForm'
import AttendanceView from './components/AttendanceView'
import axios from 'axios'

// Base URL for deployed backend
const API_BASE_URL = "https://hrms-lite-fullstack-mjki.onrender.com";

function App() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <div className="container">
      <div className="header">
        <h1>HRMS Lite</h1>
        <p>Human Resource Management System - Employee & Attendance Tracking</p>
      </div>

      <div className="content">
        {error && <div className="error">{error}</div>}
        
        <div className="quick-actions">
          <div className="action-card" onClick={() => scrollToSection('add-employee')}>
            <h3>Add Employee</h3>
            <p>Register a new employee</p>
          </div>
          <div className="action-card" onClick={() => scrollToSection('view-employees')}>
            <h3>View Employees</h3>
            <p>See all registered employees</p>
          </div>
          <div className="action-card" onClick={() => scrollToSection('attendance')}>
            <h3>Attendance</h3>
            <p>Mark and view attendance</p>
          </div>
        </div>

        <div className="section" id="add-employee">
          <div className="section-header">
            <h2>Add New Employee</h2>
          </div>
          <EmployeeForm onAddEmployee={addEmployee} />
        </div>

        <div className="section" id="view-employees">
          <div className="section-header">
            <h2>View All Employees</h2>
          </div>
          <EmployeeList 
            employees={employees} 
            loading={loading}
            onDeleteEmployee={deleteEmployee}
          />
        </div>

        <div className="section" id="attendance">
          <div className="section-header">
            <h2>Attendance Management</h2>
          </div>
          <AttendanceForm onMarkAttendance={markAttendance} />
          <AttendanceView onFetchAttendance={fetchAttendance} />
        </div>
      </div>

      <div className="footer">
        <p>HRMS Lite © 2024 - Built for efficient employee and attendance management</p>
      </div>
    </div>
  )
}

export default App
