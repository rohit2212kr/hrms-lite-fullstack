function EmployeeList({ employees, loading, onDeleteEmployee }) {
  if (loading) {
    return <div className="empty-state">Loading employees...</div>
  }

  if (employees.length === 0) {
    return <div className="empty-state">No employees yet. Start by adding your first employee above.</div>
  }

  return (
    <div>
      <h2>All Employees ({employees.length})</h2>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Action</th>
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
              <td>
                <button 
                  className="delete-btn"
                  onClick={() => onDeleteEmployee(employee.employeeId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeList
