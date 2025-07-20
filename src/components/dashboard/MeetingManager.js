import React from 'react';
import { format } from 'date-fns';
import './modern-dashboard.css';

const MeetingManager = ({ 
  upcomingMeetings,
  showMeetingModal,
  setShowMeetingModal,
  isEditingMeeting,
  setIsEditingMeeting,
  meetingToEdit,
  setMeetingToEdit,
  newMeeting,
  setNewMeeting,
  handleCreateMeeting,
  handleEditMeeting,
  handleDeleteMeeting,
  showDeleteMeetingConfirm,
  setShowDeleteMeetingConfirm,
  meetingToDelete,
  setMeetingToDelete,
  meetingToView,
  setMeetingToView,
  canManageMeetings
}) => {
  
  const handleMeetingInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetMeetingForm = () => {
    setNewMeeting({
      title: '',
      attendees: [],
      date: new Date(),
      startTime: '19:30',
      endTime: '20:30',
      location: '',
      agenda: '',
      type: 'meeting'
    });
    setIsEditingMeeting(false);
    setMeetingToEdit(null);
  };

  const handleCloseModal = () => {
    setShowMeetingModal(false);
    resetMeetingForm();
  };

  return (
    <div className="meeting-manager">
      <div className="section-header">
        <h3>Upcoming Meetings</h3>
        {canManageMeetings && (
          <button 
            className="create-btn"
            onClick={() => setShowMeetingModal(true)}
          >
            Create Meeting
          </button>
        )}
      </div>

      <div className="meetings-list">
        {upcomingMeetings.length === 0 ? (
          <p className="no-items">No upcoming meetings</p>
        ) : (
          upcomingMeetings.map((meeting) => {
            const meetingDate = meeting.date.toDate ? meeting.date.toDate() : new Date(meeting.date);
            return (
              <div key={meeting.id} className="meeting-item">
                <div className="meeting-info">
                  <h4>{meeting.title}</h4>
                  <p>Date: {format(meetingDate, 'PPP')}</p>
                  <p>Time: {meeting.startTime} - {meeting.endTime}</p>
                  <p>Location: {meeting.location}</p>
                  {meeting.attendees && meeting.attendees.length > 0 && (
                    <p>Attendees: {meeting.attendees.length}</p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Meeting Modal */}
      {showMeetingModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{isEditingMeeting ? 'Edit Meeting' : 'Create New Meeting'}</h3>
            <form onSubmit={handleCreateMeeting}>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={newMeeting.title}
                  onChange={handleMeetingInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date:</label>
                <input
                  type="date"
                  name="date"
                  value={format(new Date(newMeeting.date), 'yyyy-MM-dd')}
                  onChange={handleMeetingInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Start Time:</label>
                <input
                  type="time"
                  name="startTime"
                  value={newMeeting.startTime}
                  onChange={handleMeetingInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Time:</label>
                <input
                  type="time"
                  name="endTime"
                  value={newMeeting.endTime}
                  onChange={handleMeetingInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={newMeeting.location}
                  onChange={handleMeetingInputChange}
                />
              </div>
              <div className="form-group">
                <label>Agenda:</label>
                <textarea
                  name="agenda"
                  value={newMeeting.agenda}
                  onChange={handleMeetingInputChange}
                  rows="4"
                />
              </div>
              <div className="form-actions">
                <button type="submit">
                  {isEditingMeeting ? 'Update Meeting' : 'Create Meeting'}
                </button>
                <button type="button" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Meeting View Modal */}
      {meetingToView && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Meeting Details</h3>
            <div className="meeting-details">
              <p><strong>Title:</strong> {meetingToView.title}</p>
              <p><strong>Date:</strong> {format(meetingToView.date.toDate ? meetingToView.date.toDate() : new Date(meetingToView.date), 'PPP')}</p>
              <p><strong>Location:</strong> {meetingToView.location}</p>
              <p><strong>Agenda:</strong> {meetingToView.agenda}</p>
              {meetingToView.attendees && meetingToView.attendees.length > 0 && (
                <div>
                  <strong>Attendees:</strong>
                  <ul>
                    {meetingToView.attendees.map((attendee, index) => (
                      <li key={index}>{attendee}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="form-actions">
              <button onClick={() => setMeetingToView(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteMeetingConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete Meeting</h3>
            <p>Are you sure you want to delete "{meetingToDelete?.title}"?</p>
            <div className="form-actions">
              <button onClick={handleDeleteMeeting} className="delete-btn">
                Delete
              </button>
              <button onClick={() => {
                setShowDeleteMeetingConfirm(false);
                setMeetingToDelete(null);
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

export default MeetingManager;