import { useState } from 'react'
import './App.css'

function App() {
  const [classrooms, setClassrooms] = useState([])
  const [formData, setFormData] = useState({
    roomId: '',
    capacity: '',
    floorNo: '',
    nearWashroom: false
  })
  const [totalStudents, setTotalStudents] = useState('')
  const [allocationResult, setAllocationResult] = useState(null)
  const [error, setError] = useState('')

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    console.log('Input changed:', name, value) // Debug log
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Add classroom
  const handleAddClassroom = (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.roomId.trim()) {
      setError('Room ID is required')
      return
    }
    if (!formData.capacity || formData.capacity <= 0) {
      setError('Capacity must be greater than 0')
      return
    }
    if (formData.floorNo === '' || formData.floorNo < 0) {
      setError('Floor number must be 0 or greater')
      return
    }

    // Check for duplicate room ID
    if (classrooms.some(room => room.roomId === formData.roomId)) {
      setError('Room ID already exists')
      return
    }

    const newClassroom = {
      roomId: formData.roomId,
      capacity: parseInt(formData.capacity),
      floorNo: parseInt(formData.floorNo),
      nearWashroom: formData.nearWashroom
    }

    setClassrooms(prev => [...prev, newClassroom])
    
    // Reset form
    setFormData({
      roomId: '',
      capacity: '',
      floorNo: '',
      nearWashroom: false
    })
    
    setAllocationResult(null)
  }

  // Allocate exam seats using greedy strategy
  const allocateExamSeats = () => {
    setError('')
    setAllocationResult(null)

    // Validation
    if (!totalStudents || totalStudents <= 0) {
      setError('Please enter a valid number of students')
      return
    }

    if (classrooms.length === 0) {
      setError('No classrooms available. Please add classrooms first.')
      return
    }

    const studentsCount = parseInt(totalStudents)

    // Calculate total capacity
    const totalCapacity = classrooms.reduce((sum, room) => sum + room.capacity, 0)

    if (totalCapacity < studentsCount) {
      setError(`Insufficient capacity! Total available seats: ${totalCapacity}, Required: ${studentsCount}`)
      return
    }

    // Sort classrooms by floor number (ascending) - greedy strategy
    const sortedClassrooms = [...classrooms].sort((a, b) => a.floorNo - b.floorNo)

    // Allocate classrooms
    const allocatedRooms = []
    let remainingStudents = studentsCount

    for (const room of sortedClassrooms) {
      if (remainingStudents <= 0) break

      const seatsToAllocate = Math.min(room.capacity, remainingStudents)
      allocatedRooms.push({
        ...room,
        allocatedSeats: seatsToAllocate
      })
      remainingStudents -= seatsToAllocate
    }

    setAllocationResult({
      totalStudents: studentsCount,
      roomsUsed: allocatedRooms.length,
      allocatedRooms: allocatedRooms
    })
  }

  // Delete classroom
  const handleDeleteClassroom = (roomId) => {
    setClassrooms(prev => prev.filter(room => room.roomId !== roomId))
    setAllocationResult(null)
  }

  return (
    <div className="container">
      <header>
        <h1>🎓 College Exam Seat Planner</h1>
        <p>Efficiently allocate exam classrooms with optimal floor planning</p>
      </header>

      <div className="main-content">
        {/* Add Classroom Form */}
        <section className="card">
          <h2>Add Classroom</h2>
          <form onSubmit={handleAddClassroom}>
            <div className="form-group">
              <label htmlFor="roomId">Room ID *</label>
              <input
                type="text"
                id="roomId"
                name="roomId"
                value={formData.roomId}
                onChange={handleInputChange}
                placeholder="e.g., R101, LAB-A"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="capacity">Capacity *</label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  placeholder="e.g., 50"
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="floorNo">Floor Number *</label>
                <input
                  type="number"
                  id="floorNo"
                  name="floorNo"
                  value={formData.floorNo}
                  onChange={handleInputChange}
                  placeholder="e.g., 0, 1, 2"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="nearWashroom"
                  checked={formData.nearWashroom}
                  onChange={handleInputChange}
                />
                <span>Near Washroom</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary">
              Add Classroom
            </button>
          </form>
        </section>

        {/* Classroom Listing */}
        <section className="card">
          <h2>All Classrooms ({classrooms.length})</h2>
          {classrooms.length === 0 ? (
            <p className="no-data">No classrooms added yet. Add your first classroom above!</p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Room ID</th>
                    <th>Capacity</th>
                    <th>Floor</th>
                    <th>Near Washroom</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {classrooms
                    .sort((a, b) => a.floorNo - b.floorNo)
                    .map(room => (
                      <tr key={room.roomId}>
                        <td><strong>{room.roomId}</strong></td>
                        <td>{room.capacity}</td>
                        <td>Floor {room.floorNo}</td>
                        <td>{room.nearWashroom ? '✓ Yes' : '✗ No'}</td>
                        <td>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDeleteClassroom(room.roomId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Allocate Exam Seats */}
        <section className="card">
          <h2>Allocate Exam Seats</h2>
          <div className="allocation-form">
            <div className="form-group">
              <label htmlFor="totalStudents">Total Number of Students *</label>
              <input
                type="number"
                id="totalStudents"
                name="totalStudents"
                value={totalStudents}
                onChange={(e) => setTotalStudents(e.target.value)}
                placeholder="e.g., 150"
                min="1"
              />
            </div>
            <button
              className="btn btn-success"
              onClick={allocateExamSeats}
              disabled={classrooms.length === 0}
            >
              Allocate Classrooms
            </button>
          </div>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          {allocationResult && (
            <div className="allocation-result">
              <h3>✅ Allocation Successful!</h3>
              <div className="result-summary">
                <div className="summary-item">
                  <span className="label">Total Students:</span>
                  <span className="value">{allocationResult.totalStudents}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Rooms Used:</span>
                  <span className="value">{allocationResult.roomsUsed}</span>
                </div>
              </div>

              <h4>Allocated Classrooms:</h4>
              <div className="allocated-rooms">
                {allocationResult.allocatedRooms.map((room, index) => (
                  <div key={room.roomId} className="allocated-room-card">
                    <div className="room-number">{index + 1}</div>
                    <div className="room-details">
                      <h5>{room.roomId}</h5>
                      <p>Floor {room.floorNo} • Capacity: {room.capacity}</p>
                      <p className="allocated-seats">
                        <strong>{room.allocatedSeats}</strong> students allocated
                      </p>
                      {room.nearWashroom && <span className="badge">Near Washroom</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default App
