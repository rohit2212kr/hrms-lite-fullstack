import { useState, useEffect } from 'react'
import EmployeeForm from './components/EmployeeForm'
import EmployeeList from './components/EmployeeList'
import AttendanceForm from './components/AttendanceForm'
import AttendanceView from './components/AttendanceView'
import axios from 'axios'

function App() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await axios.get('/api/employees')
      setEmployees(response.data)
    } catch (err) {
      setError('Failed to fetch employees')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Add new employee
  const addEmployee = async (employeeData) => {
    try {
      setError('')
      const response = await axios.post('/api/employees', employeeData)
      setEmployees([...employees, response.data])
      return { success: true }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to add employee'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    }
  }

  // Delete employee
  const deleteEmployee = async (employeeId) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return
    }

    try {
      setError('')
      await axios.delete(`/api/employees/${employeeId}`)
      setEmployees(employees.filter(emp => emp.employeeId !== employeeId))
    } catch (err) {
      setError('Failed to delete employee')
      console.error(err)
    }
  }

  // Mark attendance
  const markAttendance = async (attendanceData) => {
    try {
      await axios.post('/api/attendance', attendanceData)
      return { success: true }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to mark attendance'
      return { success: false, error: errorMsg }
    }
  }

  // Fetch attendance for an employee
  const fetchAttendance = async (employeeId) => {
    try {
      const response = await axios.get(`/api/attendance/${employeeId}`)
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
      <h1>HRMS Lite - Employee Management</h1>
      
      {error && <div className="error">{error}</div>}
      
      <EmployeeForm onAddEmployee={addEmployee} />
      
      <EmployeeList 
        employees={employees} 
        loading={loading}
        onDeleteEmployee={deleteEmployee}
      />

      <div style={{ marginTop: '40px', borderTop: '2px solid #e0e0e0', paddingTop: '40px' }}>
        <h1 style={{ marginBottom: '30px' }}>Attendance Management</h1>
        
        <AttendanceForm onMarkAttendance={markAttendance} />
        
        <AttendanceView onFetchAttendance={fetchAttendance} />
      </div>
    </div>
  )
}

export default App
