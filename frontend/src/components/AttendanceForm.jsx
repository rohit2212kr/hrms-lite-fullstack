import { useState } from 'react'

function AttendanceForm({ onMarkAttendance, onAttendanceMarked }) {
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
      
      // Notify parent component that attendance was marked
      if (onAttendanceMarked) {
        onAttendanceMarked(formData.employeeId)
      }
      
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
        <div className="helper-text">Enter the ID of the employee whose attendance you want to mark</div>
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <div className="helper-text">Choose the date for this attendance record</div>
      </div>

      <div className="form-group">
        <label>Attendance Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <div className="helper-text">Mark whether the employee was present or absent</div>
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Saving Attendance...' : 'Mark Attendance'}
      </button>

      {message.text && (
        <div className={message.type}>
          {message.text}
        </div>
      )}
    </form>
  )
}

export default AttendanceForm
