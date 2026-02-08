import { useState } from 'react'

function EmployeeList({ employees, loading, onDeleteEmployee }) {
  const [openMenuId, setOpenMenuId] = useState(null)

  const toggleMenu = (employeeId) => {
    setOpenMenuId(openMenuId === employeeId ? null : employeeId)
  }

  const handleEdit = (employee) => {
    alert('Edit feature coming soon')
    setOpenMenuId(null)
  }

  const handleDelete = (employeeId) => {
    onDeleteEmployee(employeeId)
    setOpenMenuId(null)
  }

  // Close menu when clicking outside
  const handleOutsideClick = () => {
    setOpenMenuId(null)
  }

  if (loading) {
    return <div className="empty-state">Loading employees...</div>
  }

  if (employees.length === 0) {
    return <div className="empty-state">No employees yet. Start by adding your first employee.</div>
  }

  return (
    <div onClick={handleOutsideClick}>
      <div className="list-header">
        <span className="count-badge">{employees.length} {employees.length === 1 ? 'Employee' : 'Employees'}</span>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.employeeId}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td style={{ textAlign: 'center' }}>
                  <div className="action-menu-container">
                    <button 
                      className="menu-trigger"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleMenu(employee.employeeId)
                      }}
                      title="More actions"
                    >
                      ⋮
                    </button>
                    {openMenuId === employee.employeeId && (
                      <div className="action-menu">
                        <button 
                          className="menu-item"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(employee)
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          className="menu-item delete"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(employee.employeeId)
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeeList
