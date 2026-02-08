import { useState } from 'react'

function AttendanceView({ onFetchAttendance }) {
  const [employeeId, setEmployeeId] = useState('')
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setSearched(true)

    const result = await onFetchAttendance(employeeId)
    
    if (result.success) {
      setAttendanceRecords(result.data)
    } else {
      setError(result.error)
      setAttendanceRecords([])
    }
    
    setLoading(false)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div>
      <form onSubmit={handleSearch} style={{ marginBottom: '25px' }}>
        <div className="form-group">
          <label>Employee ID</label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
          <div className="helper-text">Enter an employee ID to view their complete attendance history</div>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'View Attendance Records'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {searched && !loading && !error && (
        <>
          {attendanceRecords.length === 0 ? (
            <div className="empty-state">No attendance records found for this employee yet.</div>
          ) : (
            <div>
              <div className="list-header">
                <span className="count-badge">
                  {attendanceRecords.length} {attendanceRecords.length === 1 ? 'Record' : 'Records'} for {employeeId}
                </span>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record, index) => (
                    <tr key={index}>
                      <td>{formatDate(record.date)}</td>
                      <td>
                        <span className={`status-badge ${record.status.toLowerCase()}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AttendanceView
