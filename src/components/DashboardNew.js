import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard/modern-dashboard.css';
import { auth } from '../utils/firebase';
import { useDashboard } from '../hooks/useDashboard';

// Import smaller components
import NavigationHeader from './dashboard/NavigationHeader';
import UserDetailsModal from './dashboard/UserDetailsModal';
import CalendarView from './dashboard/CalendarView';
import SessionManager from './dashboard/SessionManager';
import MeetingManager from './dashboard/MeetingManager';
import EventContextMenu from './dashboard/EventContextMenu';
import LoadingSpinner, { DashboardSkeleton } from './common/LoadingSpinner';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // UI state
  const [showUserModal, setShowUserModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [isEditingSession, setIsEditingSession] = useState(false);
  const [isEditingMeeting, setIsEditingMeeting] = useState(false);
  const [sessionToEdit, setSessionToEdit] = useState(null);
  const [meetingToEdit, setMeetingToEdit] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteMeetingConfirm, setShowDeleteMeetingConfirm] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const [meetingToDelete, setMeetingToDelete] = useState(null);
  const [sessionToView, setSessionToView] = useState(null);
  const [meetingToView, setMeetingToView] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateSessionsModalOpen, setDateSessionsModalOpen] = useState(false);
  const [sessionsForSelectedDate, setSessionsForSelectedDate] = useState([]);
  const [meetingsForSelectedDate, setMeetingsForSelectedDate] = useState([]);
  const [contextMenu, setContextMenu] = useState({ visible: false, event: null, position: { x: 0, y: 0 } });

  // Use custom hook for data management
  const {
    loading,
    sessionsLoading,
    meetingsLoading,
    user,
    leaderDetails,
    setLeaderDetails,
    saving,
    error,
    handleSubmit,
    upcomingSessions,
    newSession,
    setNewSession,
    handleCreateSession,
    deleteSession,
    upcomingMeetings,
    newMeeting,
    setNewMeeting,
    handleCreateMeeting,
    deleteMeeting,
    currentDate,
    setCurrentDate,
    canManageSessions,
    canManageMeetings
  } = useDashboard();

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUserDetailsSubmit = async (e) => {
    const success = await handleSubmit(e);
    if (success) {
      setShowUserModal(false);
    }
  };

  const handleSessionSubmit = async (e) => {
    const success = await handleCreateSession(e);
    if (success) {
      setShowSessionModal(false);
      setIsEditingSession(false);
      setSessionToEdit(null);
    }
  };

  const handleMeetingSubmit = async (e) => {
    const success = await handleCreateMeeting(e);
    if (success) {
      setShowMeetingModal(false);
      setIsEditingMeeting(false);
      setMeetingToEdit(null);
    }
  };

  const handleEditSession = (session) => {
    const sessionDate = session.date.toDate ? session.date.toDate() : new Date(session.date);
    
    setNewSession({
      title: session.title,
      section: session.section,
      date: sessionDate,
      startTime: session.startTime || '18:00',
      endTime: session.endTime || '19:00',
      location: session.location,
      description: session.description,
      type: 'session'
    });
    
    setSessionToEdit(session);
    setIsEditingSession(true);
    setShowSessionModal(true);
  };

  const handleEditMeeting = (meeting) => {
    const meetingDate = meeting.date.toDate ? meeting.date.toDate() : new Date(meeting.date);
    
    setNewMeeting({
      title: meeting.title,
      attendees: meeting.attendees || [],
      date: meetingDate,
      startTime: meeting.startTime || '19:30',
      endTime: meeting.endTime || '20:30',
      location: meeting.location,
      agenda: meeting.agenda,
      type: 'meeting'
    });
    
    setMeetingToEdit(meeting);
    setIsEditingMeeting(true);
    setShowMeetingModal(true);
  };

  const handleDeleteSession = async () => {
    if (sessionToDelete) {
      const success = await deleteSession(sessionToDelete.id);
      if (success) {
        setShowDeleteConfirm(false);
        setSessionToDelete(null);
      }
    }
  };

  const handleDeleteMeeting = async () => {
    if (meetingToDelete) {
      const success = await deleteMeeting(meetingToDelete.id);
      if (success) {
        setShowDeleteMeetingConfirm(false);
        setMeetingToDelete(null);
      }
    }
  };

  const handleDayClick = (date, events) => {
    if (events.length > 0) {
      setSelectedDate(date);
      setSessionsForSelectedDate(events.filter(e => e.type === 'session'));
      setMeetingsForSelectedDate(events.filter(e => e.type === 'meeting'));
      setDateSessionsModalOpen(true);
    }
  };

  const handleEventClick = (event, mouseEvent) => {
    const rect = mouseEvent.target.getBoundingClientRect();
    setContextMenu({
      visible: true,
      event: event,
      position: {
        x: rect.left + rect.width + 10,
        y: rect.top
      }
    });
  };

  const handleContextMenuClose = () => {
    setContextMenu({ visible: false, event: null, position: { x: 0, y: 0 } });
  };

  const handleEventEdit = (event) => {
    if (event.type === 'session') {
      handleEditSession(event);
    } else {
      handleEditMeeting(event);
    }
  };

  const handleEventDelete = (event) => {
    if (event.type === 'session') {
      setSessionToDelete(event);
      setShowDeleteConfirm(true);
    } else {
      setMeetingToDelete(event);
      setShowDeleteMeetingConfirm(true);
    }
  };

  // Show loading skeleton while initial data loads
  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      <div className="dashboard-container">
        <NavigationHeader
          user={user}
          leaderDetails={leaderDetails}
          setShowUserModal={setShowUserModal}
          handleLogout={handleLogout}
          canManageSessions={canManageSessions}
          canManageMeetings={canManageMeetings}
        />

        <div className="dashboard-content">
          <div className="main-content">
            <CalendarView
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              upcomingSessions={upcomingSessions}
              upcomingMeetings={upcomingMeetings}
              onEventClick={handleEventClick}
              canManageSessions={canManageSessions}
              canManageMeetings={canManageMeetings}
            />
          </div>

          <div className="sidebar-content">
            {sessionsLoading ? (
              <div className="session-manager">
                <LoadingSpinner message="Loading sessions..." />
              </div>
            ) : (
              <SessionManager
                upcomingSessions={upcomingSessions}
                showSessionModal={showSessionModal}
                setShowSessionModal={setShowSessionModal}
                isEditingSession={isEditingSession}
                setIsEditingSession={setIsEditingSession}
                sessionToEdit={sessionToEdit}
                setSessionToEdit={setSessionToEdit}
                newSession={newSession}
                setNewSession={setNewSession}
                handleCreateSession={handleSessionSubmit}
                handleEditSession={handleEditSession}
                handleDeleteSession={handleDeleteSession}
                showDeleteConfirm={showDeleteConfirm}
                setShowDeleteConfirm={setShowDeleteConfirm}
                sessionToDelete={sessionToDelete}
                setSessionToDelete={setSessionToDelete}
                showViewModal={sessionToView !== null}
                setShowViewModal={() => setSessionToView(null)}
                sessionToView={sessionToView}
                setSessionToView={setSessionToView}
                canManageSessions={canManageSessions}
              />
            )}

            {meetingsLoading ? (
              <div className="meeting-manager">
                <LoadingSpinner message="Loading meetings..." />
              </div>
            ) : (
              <MeetingManager
                upcomingMeetings={upcomingMeetings}
                showMeetingModal={showMeetingModal}
                setShowMeetingModal={setShowMeetingModal}
                isEditingMeeting={isEditingMeeting}
                setIsEditingMeeting={setIsEditingMeeting}
                meetingToEdit={meetingToEdit}
                setMeetingToEdit={setMeetingToEdit}
                newMeeting={newMeeting}
                setNewMeeting={setNewMeeting}
                handleCreateMeeting={handleMeetingSubmit}
                handleEditMeeting={handleEditMeeting}
                handleDeleteMeeting={handleDeleteMeeting}
                showDeleteMeetingConfirm={showDeleteMeetingConfirm}
                setShowDeleteMeetingConfirm={setShowDeleteMeetingConfirm}
                meetingToDelete={meetingToDelete}
                setMeetingToDelete={setMeetingToDelete}
                meetingToView={meetingToView}
                setMeetingToView={setMeetingToView}
                canManageMeetings={canManageMeetings}
              />
            )}
          </div>
        </div>
      </div>

      <UserDetailsModal
        showModal={showUserModal}
        setShowModal={setShowUserModal}
        leaderDetails={leaderDetails}
        handleInputChange={handleInputChange}
        handleSubmit={handleUserDetailsSubmit}
        saving={saving}
        error={error}
        user={user}
      />

      {/* Date Sessions Modal */}
      {dateSessionsModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Events for {selectedDate?.toDateString()}</h3>
            
            {sessionsForSelectedDate.length > 0 && (
              <div>
                <h4>Sessions</h4>
                {sessionsForSelectedDate.map((session, index) => (
                  <div key={index} className="event-item">
                    <strong>{session.title}</strong> - {session.section}
                    <br />
                    <small>{session.location}</small>
                  </div>
                ))}
              </div>
            )}
            
            {meetingsForSelectedDate.length > 0 && (
              <div>
                <h4>Meetings</h4>
                {meetingsForSelectedDate.map((meeting, index) => (
                  <div key={index} className="event-item">
                    <strong>{meeting.title}</strong>
                    <br />
                    <small>{meeting.location}</small>
                  </div>
                ))}
              </div>
            )}
            
            <div className="form-actions">
              <button onClick={() => setDateSessionsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <EventContextMenu
        event={contextMenu.event}
        position={contextMenu.position}
        isVisible={contextMenu.visible}
        onEdit={handleEventEdit}
        onDelete={handleEventDelete}
        onClose={handleContextMenuClose}
        canManageSessions={canManageSessions}
        canManageMeetings={canManageMeetings}
      />
    </>
  );
}