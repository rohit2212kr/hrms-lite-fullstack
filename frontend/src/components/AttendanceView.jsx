import { useState, useEffect } from 'react'

function AttendanceView({ onFetchAttendance, refreshTrigger }) {
  const [employeeId, setEmployeeId] = useState('')
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)
  const [lastSearchedId, setLastSearchedId] = useState('')
  const [autoRefresh, setAutoRefresh] = useState(false)

  const fetchAttendanceRecords = async (empId) => {
    setError('')
    setLoading(true)

    const result = await onFetchAttendance(empId)
    
    if (result.success) {
      setAttendanceRecords(result.data)
    } else {
      setError(result.error)
      setAttendanceRecords([])
    }
    
    setLoading(false)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    setSearched(true)
    setLastSearchedId(employeeId)
    setAutoRefresh(true)
    await fetchAttendanceRecords(employeeId)
  }

  // Auto-refresh when attendance is marked for the currently viewed employee
  useEffect(() => {
    if (refreshTrigger && lastSearchedId && refreshTrigger === lastSearchedId) {
      fetchAttendanceRecords(lastSearchedId)
    }
  }, [refreshTrigger, lastSearchedId, onFetchAttendance])

  // Auto-refresh every 5 seconds when viewing attendance records
  useEffect(() => {
    let interval = null
    if (autoRefresh && lastSearchedId && !loading) {
      interval = setInterval(() => {
        fetchAttendanceRecords(lastSearchedId)
      }, 5000) // Refresh every 5 seconds
    }
    
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [autoRefresh, lastSearchedId, loading, onFetchAttendance])

  // Stop auto-refresh when component unmounts or search changes
  useEffect(() => {
    return () => setAutoRefresh(false)
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const handleStopAutoRefresh = () => {
    setAutoRefresh(false)
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

        {/* Results Display Area - Red Rectangle */}
        <div className="attendance-results-area">
          {!searched && (
            <div className="results-placeholder">
              <p>Enter an employee ID above and click "View Attendance Records" to see their attendance history here.</p>
            </div>
          )}

          {searched && loading && (
            <div className="results-loading">
              <p>🔄 Loading attendance records...</p>
            </div>
          )}

          {searched && !loading && error && (
            <div className="results-error">
              <p>❌ {error}</p>
            </div>
          )}

          {searched && !loading && !error && attendanceRecords.length === 0 && (
            <div className="results-empty">
              <p>📋 No attendance records found for employee "{lastSearchedId}"</p>
              <p>This employee hasn't had any attendance marked yet.</p>
            </div>
          )}

          {searched && !loading && !error && attendanceRecords.length > 0 && (
            <div className="results-content">
              <div className="results-header">
                <span className="results-count-badge">
                  {attendanceRecords.length} {attendanceRecords.length === 1 ? 'Record' : 'Records'} for {lastSearchedId}
                </span>
                {autoRefresh && (
                  <div className="results-auto-refresh">
                    <span>🔄 Auto-refreshing every 5s</span>
                    <button 
                      type="button" 
                      onClick={handleStopAutoRefresh}
                      className="stop-refresh-btn"
                    >
                      Stop
                    </button>
                  </div>
                )}
              </div>
              
              <div className="results-table-container">
                <table className="results-table">
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
            </div>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'View Attendance Records'}
        </button>
      </form>
    </div>
  )
}

export default AttendanceView
