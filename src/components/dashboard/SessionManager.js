import React from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import './modern-dashboard.css';

const SessionManager = ({
  upcomingSessions,
  showSessionModal,
  setShowSessionModal,
  isEditingSession,
  setIsEditingSession,
  sessionToEdit,
  setSessionToEdit,
  newSession,
  setNewSession,
  handleCreateSession,
  handleEditSession,
  handleDeleteSession,
  showDeleteConfirm,
  setShowDeleteConfirm,
  sessionToDelete,
  setSessionToDelete,
  showViewModal,
  setShowViewModal,
  sessionToView,
  setSessionToView,
  canManageSessions
}) => {
  const navigate = useNavigate();
  
  const handleSessionInputChange = (e) => {
    const { name, value } = e.target;
    setNewSession(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetSessionForm = () => {
    setNewSession({
      title: '',
      section: 'Beavers',
      date: new Date(),
      startTime: '18:00',
      endTime: '19:00',
      location: '',
      description: '',
      type: 'session'
    });
    setIsEditingSession(false);
    setSessionToEdit(null);
  };

  const handleCloseModal = () => {
    setShowSessionModal(false);
    resetSessionForm();
  };

  return (
    <div className="session-manager">
      <div className="section-header">
        <h3>Upcoming Sessions</h3>
        {canManageSessions && (
          <button
            className="create-btn"
            onClick={() => navigate('/planner')}
          >
            Create Session
          </button>
        )}
      </div>

      <div className="sessions-list">
        {upcomingSessions.length === 0 ? (
          <p className="no-items">No upcoming sessions</p>
        ) : (
          upcomingSessions.map((session) => {
            const sessionDate = session.date.toDate ? session.date.toDate() : new Date(session.date);
            return (
              <div key={session.id} className="session-item">
                <div className="session-info">
                  <h4>{session.title}</h4>
                  <p>Section: {session.section}</p>
                  <p>Date: {format(sessionDate, 'PPP')}</p>
                  <p>Time: {session.startTime} - {session.endTime}</p>
                  <p>Location: {session.location}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Session Modal */}
      {showSessionModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{isEditingSession ? 'Edit Session' : 'Create New Session'}</h3>
            <form onSubmit={handleCreateSession}>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={newSession.title}
                  onChange={handleSessionInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Section:</label>
                <select
                  name="section"
                  value={newSession.section}
                  onChange={handleSessionInputChange}
                  required
                >
                  <option value="Beavers">Beavers</option>
                  <option value="Cubs">Cubs</option>
                  <option value="Scouts">Scouts</option>
                  <option value="Explorers">Explorers</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date:</label>
                <input
                  type="date"
                  name="date"
                  value={format(new Date(newSession.date), 'yyyy-MM-dd')}
                  onChange={handleSessionInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Start Time:</label>
                <input
                  type="time"
                  name="startTime"
                  value={newSession.startTime}
                  onChange={handleSessionInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Time:</label>
                <input
                  type="time"
                  name="endTime"
                  value={newSession.endTime}
                  onChange={handleSessionInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={newSession.location}
                  onChange={handleSessionInputChange}
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={newSession.description}
                  onChange={handleSessionInputChange}
                  rows="4"
                />
              </div>
              <div className="form-actions">
                <button type="submit">
                  {isEditingSession ? 'Update Session' : 'Create Session'}
                </button>
                <button type="button" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Session View Modal */}
      {sessionToView && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Session Details</h3>
            <div className="session-details">
              <p><strong>Title:</strong> {sessionToView.title}</p>
              <p><strong>Section:</strong> {sessionToView.section}</p>
              <p><strong>Date:</strong> {format(sessionToView.date.toDate ? sessionToView.date.toDate() : new Date(sessionToView.date), 'PPP')}</p>
              <p><strong>Location:</strong> {sessionToView.location}</p>
              <p><strong>Description:</strong> {sessionToView.description}</p>
            </div>
            <div className="form-actions">
              <button onClick={() => setSessionToView(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete Session</h3>
            <p>Are you sure you want to delete "{sessionToDelete?.title}"?</p>
            <div className="form-actions">
              <button onClick={handleDeleteSession} className="delete-btn">
                Delete
              </button>
              <button onClick={() => {
                setShowDeleteConfirm(false);
                setSessionToDelete(null);
              }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionManager;