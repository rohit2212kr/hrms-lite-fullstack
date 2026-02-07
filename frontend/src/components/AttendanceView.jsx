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
    <div className="form-section">
      <h2>View Attendance Records</h2>
      
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <div className="form-group">
          <label>Employee ID *</label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
            placeholder="e.g., EMP001"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search Attendance'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {searched && !loading && !error && (
        <>
          {attendanceRecords.length === 0 ? (
            <div className="empty-state">No attendance records found for this employee.</div>
          ) : (
            <div>
              <h3 style={{ marginBottom: '15px', color: '#555' }}>
                Records for Employee: {employeeId} ({attendanceRecords.length} records)
              </h3>
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
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500',
                          backgroundColor: record.status === 'Present' ? '#e8f5e9' : '#ffebee',
                          color: record.status === 'Present' ? '#2e7d32' : '#c62828'
                        }}>
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
