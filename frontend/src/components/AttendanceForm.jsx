import { useState } from 'react'

function AttendanceForm({ onMarkAttendance }) {
  const [formData, setFormData] = useState({
    employeeId: '',
    date: '',
    status: 'Present'
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

    const result = await onMarkAttendance(formData)
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Attendance marked successfully!' })
      setFormData({
        employeeId: '',
        date: '',
        status: 'Present'
      })
    } else {
      setMessage({ type: 'error', text: result.error })
    }
    
    setSubmitting(false)
  }

  return (
    <div className="form-section">
      <h2>Mark Attendance</h2>
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
          <label>Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status *</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Marking...' : 'Mark Attendance'}
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

export default AttendanceForm
