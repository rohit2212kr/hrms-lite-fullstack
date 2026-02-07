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
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee ID *</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
            placeholder="e.g., EMP001"
          />
        </div>

        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., John Doe"
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="e.g., john@example.com"
          />
        </div>

        <div className="form-group">
          <label>Department *</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            placeholder="e.g., Engineering"
          />
        </div>

        <div className="form-group">
          <label>Position *</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            placeholder="e.g., Software Engineer"
          />
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Employee'}
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
