import { useState } from 'react'

function EmployeeForm({ onAddEmployee }) {
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    email: '',
    department: '',
    position: ''
  })
  const [message, setMessage] = useState({ type: '', text: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })
    setSubmitting(true)

    const result = await onAddEmployee(formData)
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Employee added successfully!' })
      setFormData({
        employeeId: '',
        name: '',
        email: '',
        department: '',
        position: ''
      })
    } else {
      setMessage({ type: 'error', text: result.error })
    }
    
    setSubmitting(false)
  }

  return (
    <div className="form-section">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee ID</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
          />
          <div className="helper-text">Unique identifier such as EMP001, EMP002, etc.</div>
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <div className="helper-text">Employee's complete name as per official records</div>
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="helper-text">Work email address for official communication</div>
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
          <div className="helper-text">The department or team this employee belongs to</div>
        </div>

        <div className="form-group">
          <label>Job Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
          <div className="helper-text">Current role or job title</div>
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Adding Employee...' : 'Add Employee'}
        </button>

        {message.text && (
          <div className={message.type}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  )
}

export default EmployeeForm
