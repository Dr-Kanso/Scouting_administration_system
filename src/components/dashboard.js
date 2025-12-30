import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import logo from '../assets/logo.png';
import { auth, db } from '../utils/firebase';
import { doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [showUserModal, setShowUserModal] = useState(false);
  const [leaderDetails, setLeaderDetails] = useState({
    firstName: '',
    lastName: '',
    section: 'Beavers',
    role: '',
    phone: ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Session state variables
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [isEditingSession, setIsEditingSession] = useState(false);
  const [sessionToEdit, setSessionToEdit] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const [newSession, setNewSession] = useState({
    title: '',
    section: 'Beavers',
    date: new Date(),
    startTime: '18:00',
    endTime: '19:00',
    location: '',
    description: '',
    type: 'session'
  });
  const [showViewModal, setShowViewModal] = useState(false);
  const [sessionToView, setSessionToView] = useState(null);

  // Meeting state variables
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [isEditingMeeting, setIsEditingMeeting] = useState(false);
  const [meetingToEdit, setMeetingToEdit] = useState(null);
  const [showDeleteMeetingConfirm, setShowDeleteMeetingConfirm] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState(null);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    attendees: [],
    date: new Date(),
    startTime: '19:30',
    endTime: '20:30',
    location: '',
    agenda: '',
    type: 'meeting'
  });
  const [meetingToView, setMeetingToView] = useState(null);

  // Calendar state
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateSessionsModalOpen, setDateSessionsModalOpen] = useState(false);
  const [sessionsForSelectedDate, setSessionsForSelectedDate] = useState([]);
  const [meetingsForSelectedDate, setMeetingsForSelectedDate] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  const fetchUserDetails = async () => {
    try {
      const userDocRef = doc(db, 'leaders', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setLeaderDetails(userDoc.data());
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (leaderDetails.role === 'GSL' && user?.email !== 'drhassankanso@gmail.com') {
      setError("Only drhassankanso@gmail.com can be assigned the GSL role.");
      return;
    }

    setSaving(true);

    try {
      const userDocRef = doc(db, 'leaders', user.uid);

      const roleData = {
        role: leaderDetails.role,
        section: leaderDetails.section,
        email: user.email,
        uid: user.uid,
        updatedAt: new Date()
      };

      await setDoc(userDocRef, {
        ...leaderDetails,
        email: user.email,
        uid: user.uid,
        lastUpdated: new Date(),
        roleAssigned: true,
      }, { merge: true });

      const roleDocRef = doc(db, 'roles', user.uid);
      await setDoc(roleDocRef, roleData, { merge: true });

      setSaving(false);
      setShowUserModal(false);
    } catch (err) {
      setError("Failed to save user details. Please try again.");
      setSaving(false);
      console.error("Error saving user details:", err);
    }
  };

  const hasRole = (roleToCheck) => {
    if (!leaderDetails || !leaderDetails.role) return false;

    if (roleToCheck === 'GSL') {
      return leaderDetails.role === 'GSL' && user?.email === 'drhassankanso@gmail.com';
    }

    return leaderDetails.role === roleToCheck;
  };

  const canManageSessions = hasRole('GSL') || hasRole('Group Leader (Male)') || hasRole('Group Leader (Female)') || hasRole('Leader');
  const canManageMeetings = hasRole('GSL') || hasRole('Group Leader (Male)') || hasRole('Group Leader (Female)');

  const handleCreateSession = async (e) => {
    e.preventDefault();

    try {
      const sessionsRef = collection(db, 'sessions');

      const sessionDate = new Date(newSession.date);
      const [startHour, startMinute] = newSession.startTime.split(':');
      sessionDate.setHours(parseInt(startHour), parseInt(startMinute), 0);

      await addDoc(sessionsRef, {
        title: newSession.title,
        section: newSession.section,
        date: sessionDate,
        location: newSession.location,
        description: newSession.description,
        type: 'session',
        createdBy: user.uid,
        createdAt: new Date()
      });

      setShowSessionModal(false);
      setIsEditingSession(false);
      setSessionToEdit(null);
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

      fetchUpcomingSessions();
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  const handleEditSession = (session) => {
    const sessionDate = session.date.toDate ? session.date.toDate() : new Date(session.date);
    const hours = sessionDate.getHours().toString().padStart(2, '0');
    const minutes = sessionDate.getMinutes().toString().padStart(2, '0');
    
    setNewSession({
      id: session.id,
      title: session.title || '',
      section: session.section || 'Beavers',
      date: sessionDate,
      startTime: `${hours}:${minutes}`,
      location: session.location || '',
      description: session.description || '',
      type: 'session'
    });
    
    setSessionToEdit(session);
    setIsEditingSession(true);
    setShowSessionModal(true);
  };

  const handleConfirmDelete = (session) => {
    setSessionToDelete(session);
    setShowDeleteConfirm(true);
  };
  
  const handleUpdateSession = async (e) => {
    e.preventDefault();
    
    try {
      const sessionDate = new Date(newSession.date);
      const [startHour, startMinute] = newSession.startTime.split(':');
      sessionDate.setHours(parseInt(startHour), parseInt(startMinute), 0);
      
      const sessionRef = doc(db, 'sessions', sessionToEdit.id);
      await updateDoc(sessionRef, {
        title: newSession.title,
        section: newSession.section,
        date: sessionDate,
        location: newSession.location,
        description: newSession.description,
        type: 'session',
        updatedAt: new Date(),
        updatedBy: user.uid
      });
      
      setShowSessionModal(false);
      setIsEditingSession(false);
      setSessionToEdit(null);
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
      
      fetchUpcomingSessions();
    } catch (error) {
      console.error("Error updating session:", error);
    }
  };
  
  const handleNewSessionChange = (e) => {
    const { name, value } = e.target;
    setNewSession(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSessionDateChange = (date) => {
    setNewSession(prev => ({
      ...prev,
      date
    }));
  };
  
  const handleDeleteSession = async () => {
    try {
      const sessionRef = doc(db, 'sessions', sessionToDelete.id);
      await deleteDoc(sessionRef);
      
      setShowDeleteConfirm(false);
      setSessionToDelete(null);
      fetchUpcomingSessions();
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  const handleCreateMeeting = async (e) => {
    e.preventDefault();

    try {
      const meetingsRef = collection(db, 'meetings');
      
      const meetingDate = new Date(newMeeting.date);
      const [startHour, startMinute] = newMeeting.startTime.split(':');
      meetingDate.setHours(parseInt(startHour), parseInt(startMinute), 0);
      
      await addDoc(meetingsRef, {
        title: newMeeting.title,
        attendees: newMeeting.attendees,
        date: meetingDate,
        location: newMeeting.location,
        agenda: newMeeting.agenda,
        type: 'meeting',
        createdBy: user.uid,
        createdAt: new Date()
      });

      setShowMeetingModal(false);
      setIsEditingMeeting(false);
      setMeetingToEdit(null);
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
      
      fetchUpcomingMeetings();
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  const handleEditMeeting = (meeting) => {
    const meetingDate = meeting.date.toDate ? meeting.date.toDate() : new Date(meeting.date);
    const hours = meetingDate.getHours().toString().padStart(2, '0');
    const minutes = meetingDate.getMinutes().toString().padStart(2, '0');
    
    setNewMeeting({
      id: meeting.id,
      title: meeting.title || '',
      attendees: meeting.attendees || [],
      date: meetingDate,
      startTime: `${hours}:${minutes}`,
      location: meeting.location || '',
      agenda: meeting.agenda || '',
      type: 'meeting'
    });
    
    setMeetingToEdit(meeting);
    setIsEditingMeeting(true);
    setShowMeetingModal(true);
  };
  
  const handleConfirmDeleteMeeting = (meeting) => {
    setMeetingToDelete(meeting);
    setShowDeleteMeetingConfirm(true);
  };
  
  const handleUpdateMeeting = async (e) => {
    e.preventDefault();
    
    try {
      const meetingDate = new Date(newMeeting.date);
      const [startHour, startMinute] = newMeeting.startTime.split(':');
      meetingDate.setHours(parseInt(startHour), parseInt(startMinute), 0);
      
      const meetingRef = doc(db, 'meetings', meetingToEdit.id);
      await updateDoc(meetingRef, {
        title: newMeeting.title,
        attendees: newMeeting.attendees,
        date: meetingDate,
        location: newMeeting.location,
        agenda: newMeeting.agenda,
        type: 'meeting',
        updatedAt: new Date(),
        updatedBy: user.uid
      });
      
      setShowMeetingModal(false);
      setIsEditingMeeting(false);
      setMeetingToEdit(null);
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
      
      fetchUpcomingMeetings();
    } catch (error) {
      console.error("Error updating meeting:", error);
    }
  };
  
  const handleNewMeetingChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleMeetingDateChange = (date) => {
    setNewMeeting(prev => ({
      ...prev,
      date
    }));
  };
  
  const handleAttendeeChange = (e) => {
    const attendeesArray = e.target.value.split(',').map(item => item.trim()).filter(item => item);
    setNewMeeting(prev => ({
      ...prev,
      attendees: attendeesArray
    }));
  };
  
  const handleDeleteMeeting = async () => {
    try {
      const meetingRef = doc(db, 'meetings', meetingToDelete.id);
      await deleteDoc(meetingRef);
      
      setShowDeleteMeetingConfirm(false);
      setMeetingToDelete(null);
      fetchUpcomingMeetings();
    } catch (error) {
      console.error("Error deleting meeting:", error);
    }
  };

  const handleViewSession = (session) => {
    try {
      sessionStorage.setItem('viewingSession', JSON.stringify({
        id: session.id,
        title: session.title,
        section: session.section,
        date: session.date,
        location: session.location,
        description: session.description,
        type: 'session',
        createdBy: session.createdBy
      }));
      navigate(`/sessions?action=view&id=${session.id}`);
    } catch (error) {
      console.error("Navigation error:", error);
      navigate('/sessions');
    }
  };

  const handleViewMeeting = (meeting) => {
    try {
      setMeetingToView(meeting);
      setShowViewModal(true);
    } catch (error) {
      console.error("Error showing meeting:", error);
    }
  };

  const handleCalendarDayClick = (day, dayEvents) => {
    if (dayEvents.length > 0) {
      const sessions = dayEvents.filter(event => event.type === 'session');
      const meetings = dayEvents.filter(event => event.type === 'meeting');
      setSelectedDate(day);
      setSessionsForSelectedDate(sessions);
      setMeetingsForSelectedDate(meetings);
      setDateSessionsModalOpen(true);
    }
  };

  const fetchUpcomingSessions = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const thirtyDaysLater = new Date(today);
      thirtyDaysLater.setDate(today.getDate() + 30);

      const sessionsRef = collection(db, 'sessions');
      const q = query(
        sessionsRef,
        where('date', '>=', today),
        where('date', '<=', thirtyDaysLater),
        orderBy('date', 'asc')
      );

      const snapshot = await getDocs(q);
      const sessionsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        type: 'session'
      }));
      setUpcomingSessions(sessionsData);
    } catch (error) {
      console.error("Error fetching upcoming sessions:", error);
    }
  };

  const fetchUpcomingMeetings = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const thirtyDaysLater = new Date(today);
      thirtyDaysLater.setDate(today.getDate() + 30);

      const meetingsRef = collection(db, 'meetings');
      const q = query(
        meetingsRef,
        where('date', '>=', today),
        where('date', '<=', thirtyDaysLater),
        orderBy('date', 'asc')
      );

      const snapshot = await getDocs(q);
      const meetingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        type: 'meeting'
      }));
      setUpcomingMeetings(meetingsData);
    } catch (error) {
      console.error("Error fetching upcoming meetings:", error);
    }
  };

  useEffect(() => {
    fetchUpcomingSessions();
    fetchUpcomingMeetings();
  }, []);

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "MMMM yyyy";
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const allEvents = [...upcomingSessions, ...upcomingMeetings];

    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={prevMonth}>&lt;</button>
          <h3>{format(currentDate, dateFormat)}</h3>
          <button onClick={nextMonth}>&gt;</button>
        </div>
        <div className="calendar-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-day-name">{day}</div>
          ))}
          {days.map(day => {
            const dayEvents = allEvents.filter(event => {
              if (!event.date) return false;
              const eventDate = event.date.toDate ? event.date.toDate() : new Date(event.date);
              return isSameDay(eventDate, day);
            });

            return (
              <div
                key={day.toString()}
                className={`calendar-day ${!isSameMonth(day, monthStart) ? 'other-month' : ''} 
                  ${isSameDay(day, new Date()) ? 'today' : ''} 
                  ${dayEvents.length > 0 ? 'has-event' : ''}`}
                onClick={() => handleCalendarDayClick(day, dayEvents)}
              >
                <div className="calendar-day-header">{format(day, 'd')}</div>
                {dayEvents.slice(0, 2).map(event => (
                  <div
                    key={event.id}
                    className={`event-item ${event.type === 'session' ?
                      `session-event ${event.section?.toLowerCase() || ''}` :
                      'meeting-event'}`}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="more-events">+{dayEvents.length - 2} more</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <div className="header">
        <img
          src={logo}
          alt="Hidaya Logo"
          className="logo"
          onClick={() => navigate('/dashboard')}
        />
        <div className="title-area">
          <h1>Welcome to Hidaya Scouts</h1>
          {leaderDetails.firstName && (
            <div className="leader-info">
              <span className="leader-badge">
                {leaderDetails.firstName} {leaderDetails.lastName && leaderDetails.lastName.charAt(0)}
                {leaderDetails.section && ` - ${leaderDetails.section}`}
              </span>
            </div>
          )}
        </div>
        <div className="user-info">
          <p>{user?.email}</p>
          <button className="signout-button" onClick={handleLogout}>Sign Out</button>
        </div>
      </div>

      <div className="card-grid">
        <div className="card" onClick={() => navigate('/planner')}>
          🧭 Session Planner
        </div>
        <div className="card" onClick={() => navigate('/badges')}>
          🏅 Badge Tracker & Progress
        </div>
        <div className="card" onClick={() => navigate('/resources')}>
          📂 Resource Library
        </div>
        <div className="card" onClick={() => navigate('/sessions')}>
          📋 Session List
        </div>
        <div className="card" onClick={() => navigate('/members')}>
          👥 Member Database
        </div>
        {hasRole('GSL') && (
          <div 
            className="card admin-card"
            onClick={() => navigate('/admin')}
            aria-label="Admin Dashboard"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('/admin');
              }
            }}
          >
            🔐 Admin Dashboard
          </div>
        )}
        <div
          className="card manage-user-card"
          onClick={() => setShowUserModal(true)}
          aria-label="Manage Leader Details"
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setShowUserModal(true);
            }
          }}
        >
          👤 Manage my details
        </div>
      </div>

      <div className="upcoming-events">
        <h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Calendar
          <div className="event-buttons">
            {canManageSessions && (
              <button
                className="add-session-button"
                onClick={() => setShowSessionModal(true)}
              >
                + Add Scout Session
              </button>
            )}
            {canManageMeetings && (
              <button
                className="add-meeting-button"
                onClick={() => setShowMeetingModal(true)}
              >
                + Add Leader Meeting
              </button>
            )}
          </div>
        </h2>

        {renderCalendar()}

        <div className="events-lists-container">
          <div className="session-list">
            <h3>Next 5 Scout Sessions</h3>
            {upcomingSessions.length > 0 ? (
              upcomingSessions.slice(0, 5).map(session => {
                const sessionDate = session.date.toDate ? session.date.toDate() : new Date(session.date);
                const sectionClass = session.section ? session.section.toLowerCase() : '';

                return (
                  <div key={session.id} className={`session-item ${sectionClass}`}>
                    <div className="session-date">
                      <div className="session-day">
                        {format(sessionDate, 'd')}
                      </div>
                      <div className="session-month">
                        {format(sessionDate, 'MMM')}
                      </div>
                    </div>

                    <div className="session-details">
                      <div className="session-title">{session.title}</div>
                      <div className="session-info">
                        <span className={sectionClass}>{session.section} Section</span>
                        <span>{format(sessionDate, 'h:mm a')}</span>
                      </div>
                    </div>

                    <div className="session-actions">
                      <button onClick={() => handleViewSession(session)}>View</button>
                      {(canManageSessions || session.createdBy === user.uid) && (
                        <>
                          <button className="edit-button" onClick={() => handleEditSession(session)}>Edit</button>
                          <button className="delete-button" onClick={() => handleConfirmDelete(session)}>Delete</button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No upcoming sessions in the next 30 days.</p>
            )}
          </div>

          <div className="meeting-list">
            <h3>Next 5 Leader Meetings</h3>
            {upcomingMeetings.length > 0 ? (
              upcomingMeetings.slice(0, 5).map(meeting => {
                const meetingDate = meeting.date.toDate ? meeting.date.toDate() : new Date(meeting.date);

                return (
                  <div key={meeting.id} className="meeting-item">
                    <div className="meeting-date">
                      <div className="meeting-day">
                        {format(meetingDate, 'd')}
                      </div>
                      <div className="meeting-month">
                        {format(meetingDate, 'MMM')}
                      </div>
                    </div>

                    <div className="meeting-details">
                      <div className="meeting-title">{meeting.title}</div>
                      <div className="meeting-info">
                        <span>{meeting.attendees?.length || 0} attendees</span>
                        <span>{format(meetingDate, 'h:mm a')}</span>
                      </div>
                    </div>

                    <div className="meeting-actions">
                      <button onClick={() => handleViewMeeting(meeting)}>View</button>
                      {(canManageMeetings || meeting.createdBy === user.uid) && (
                        <>
                          <button className="edit-button" onClick={() => handleEditMeeting(meeting)}>Edit</button>
                          <button className="delete-button" onClick={() => handleConfirmDeleteMeeting(meeting)}>Delete</button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No upcoming meetings in the next 30 days.</p>
            )}
          </div>
        </div>
      </div>

      {/* Session Modal */}
      {showSessionModal && (
        <div className="modal-overlay">
          <div className="user-modal">
            <div className="modal-header">
              <h2>{isEditingSession ? 'Edit Scout Session' : 'Create New Scout Session'}</h2>
              <button className="close-button" onClick={() => {
                setShowSessionModal(false);
                setIsEditingSession(false);
                setSessionToEdit(null);
              }}>×</button>
            </div>
            
            <form onSubmit={isEditingSession ? handleUpdateSession : handleCreateSession}>
              <div className="form-group">
                <label htmlFor="title">Session Title</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  value={newSession.title} 
                  onChange={handleNewSessionChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="section">Section</label>
                <select 
                  id="section" 
                  name="section" 
                  value={newSession.section} 
                  onChange={handleNewSessionChange}
                >
                  <option value="Beavers">Beavers</option>
                  <option value="Cubs">Cubs</option>
                  <option value="Scouts">Scouts</option>
                  <option value="Explorers">Explorers</option>
                  <option value="All">All Sections</option>
                </select>
              </div>
              
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="date">Date</label>
                  <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    value={newSession.date instanceof Date ? newSession.date.toISOString().split('T')[0] : ''} 
                    onChange={(e) => handleSessionDateChange(new Date(e.target.value))}
                    required
                  />
                </div>
                
                <div className="form-group half">
                  <label htmlFor="startTime">Start Time</label>
                  <input 
                    type="time" 
                    id="startTime" 
                    name="startTime" 
                    value={newSession.startTime} 
                    onChange={handleNewSessionChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input 
                  type="text" 
                  id="location" 
                  name="location" 
                  value={newSession.location} 
                  onChange={handleNewSessionChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                  id="description" 
                  name="description" 
                  value={newSession.description} 
                  onChange={handleNewSessionChange}
                  rows="3"
                ></textarea>
              </div>
              
              <div className="modal-actions">
                <button type="button" onClick={() => {
                  setShowSessionModal(false);
                  setIsEditingSession(false);
                  setSessionToEdit(null);
                }}>Cancel</button>
                <button type="submit" className="primary-button">
                  {isEditingSession ? 'Update Session' : 'Create Session'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Meeting Modal */}
      {showMeetingModal && (
        <div className="modal-overlay">
          <div className="user-modal">
            <div className="modal-header">
              <h2>{isEditingMeeting ? 'Edit Leader Meeting' : 'Create New Leader Meeting'}</h2>
              <button className="close-button" onClick={() => {
                setShowMeetingModal(false);
                setIsEditingMeeting(false);
                setMeetingToEdit(null);
              }}>×</button>
            </div>
            
            <form onSubmit={isEditingMeeting ? handleUpdateMeeting : handleCreateMeeting}>
              <div className="form-group">
                <label htmlFor="meeting-title">Meeting Title</label>
                <input 
                  type="text" 
                  id="meeting-title" 
                  name="title" 
                  value={newMeeting.title} 
                  onChange={handleNewMeetingChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="meeting-date">Date</label>
                  <input 
                    type="date" 
                    id="meeting-date" 
                    name="date" 
                    value={newMeeting.date instanceof Date ? newMeeting.date.toISOString().split('T')[0] : ''} 
                    onChange={(e) => handleMeetingDateChange(new Date(e.target.value))}
                    required
                  />
                </div>
                
                <div className="form-group half">
                  <label htmlFor="meeting-startTime">Start Time</label>
                  <input 
                    type="time" 
                    id="meeting-startTime" 
                    name="startTime" 
                    value={newMeeting.startTime} 
                    onChange={handleNewMeetingChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="meeting-location">Location</label>
                <input 
                  type="text" 
                  id="meeting-location" 
                  name="location" 
                  value={newMeeting.location} 
                  onChange={handleNewMeetingChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="meeting-attendees">Expected Attendees (comma separated)</label>
                <input 
                  type="text" 
                  id="meeting-attendees" 
                  name="attendees" 
                  value={Array.isArray(newMeeting.attendees) ? newMeeting.attendees.join(', ') : ''} 
                  onChange={(e) => handleAttendeeChange(e)}
                  placeholder="e.g. John, Sarah, Mike"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="meeting-agenda">Agenda</label>
                <textarea 
                  id="meeting-agenda" 
                  name="agenda" 
                  value={newMeeting.agenda} 
                  onChange={handleNewMeetingChange}
                  rows="3"
                  placeholder="Meeting agenda items..."
                ></textarea>
              </div>
              
              <div className="modal-actions">
                <button type="button" onClick={() => {
                  setShowMeetingModal(false);
                  setIsEditingMeeting(false);
                  setMeetingToEdit(null);
                }}>Cancel</button>
                <button type="submit" className="primary-button">
                  {isEditingMeeting ? 'Update Meeting' : 'Create Meeting'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && sessionToDelete && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button className="close-button" onClick={() => {
                setShowDeleteConfirm(false);
                setSessionToDelete(null);
              }}>×</button>
            </div>
            
            <div className="confirm-content">
              <p>Are you sure you want to delete this session?</p>
              <p><strong>{sessionToDelete.title}</strong> on {format(
                sessionToDelete.date.toDate ? sessionToDelete.date.toDate() : new Date(sessionToDelete.date),
                'MMMM d, yyyy'
              )}</p>
              <p>This action cannot be undone.</p>
            </div>
            
            <div className="modal-actions">
              <button onClick={() => {
                setShowDeleteConfirm(false);
                setSessionToDelete(null);
              }}>Cancel</button>
              <button className="delete-button" onClick={handleDeleteSession}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Meeting Modal */}
      {showDeleteMeetingConfirm && meetingToDelete && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button className="close-button" onClick={() => {
                setShowDeleteMeetingConfirm(false);
                setMeetingToDelete(null);
              }}>×</button>
            </div>
            
            <div className="confirm-content">
              <p>Are you sure you want to delete this meeting?</p>
              <p><strong>{meetingToDelete.title}</strong> on {format(
                meetingToDelete.date.toDate ? meetingToDelete.date.toDate() : new Date(meetingToDelete.date),
                'MMMM d, yyyy'
              )}</p>
              <p>This action cannot be undone.</p>
            </div>
            
            <div className="modal-actions">
              <button onClick={() => {
                setShowDeleteMeetingConfirm(false);
                setMeetingToDelete(null);
              }}>Cancel</button>
              <button className="delete-button" onClick={handleDeleteMeeting}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* View Meeting Modal */}
      {showViewModal && meetingToView && (
        <div className="modal-overlay">
          <div className="view-modal">
            <div className="modal-header">
              <h2>{meetingToView.title}</h2>
              <button className="close-button" onClick={() => {
                setShowViewModal(false);
                setMeetingToView(null);
              }}>×</button>
            </div>
            
            <div className="view-content">
              <div className="session-detail-row">
                <div className="detail-label">Date:</div>
                <div className="detail-value">
                  {format(
                    meetingToView.date.toDate ? meetingToView.date.toDate() : new Date(meetingToView.date),
                    'MMMM d, yyyy'
                  )}
                </div>
              </div>
              
              <div className="session-detail-row">
                <div className="detail-label">Time:</div>
                <div className="detail-value">
                  {format(
                    meetingToView.date.toDate ? meetingToView.date.toDate() : new Date(meetingToView.date),
                    'h:mm a'
                  )}
                </div>
              </div>
              
              <div className="session-detail-row">
                <div className="detail-label">Location:</div>
                <div className="detail-value">{meetingToView.location || 'No location specified'}</div>
              </div>
              
              {meetingToView.attendees && meetingToView.attendees.length > 0 && (
                <div className="session-detail-row">
                  <div className="detail-label">Attendees:</div>
                  <div className="detail-value">
                    {meetingToView.attendees.join(', ')}
                  </div>
                </div>
              )}
              
              {meetingToView.agenda && (
                <div className="session-detail-row">
                  <div className="detail-label">Agenda:</div>
                  <div className="detail-value description">{meetingToView.agenda}</div>
                </div>
              )}
            </div>
            
            <div className="modal-actions">
              <button onClick={() => {
                setShowViewModal(false);
                setMeetingToView(null);
              }}>Close</button>
              
              {(canManageMeetings || meetingToView.createdBy === user.uid) && (
                <>
                  <button className="edit-button" onClick={() => {
                    setShowViewModal(false);
                    handleEditMeeting(meetingToView);
                  }}>Edit</button>
                  <button className="delete-button" onClick={() => {
                    setShowViewModal(false);
                    handleConfirmDeleteMeeting(meetingToView);
                  }}>Delete</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Date Events Modal */}
      {dateSessionsModalOpen && selectedDate && (
        <div className="modal-overlay">
          <div className="view-modal">
            <div className="modal-header">
              <h2>Events on {format(selectedDate, 'MMMM d, yyyy')}</h2>
              <button className="close-button" onClick={() => {
                setDateSessionsModalOpen(false);
                setSelectedDate(null);
              }}>×</button>
            </div>
            
            <div className="view-content date-events-container">
              {/* Sessions Section */}
              {sessionsForSelectedDate.length > 0 && (
                <div className="date-events-section">
                  <h4>Scout Sessions</h4>
                  <div className="date-sessions-list">
                    {sessionsForSelectedDate.map(session => {
                      const sessionDate = session.date.toDate ? session.date.toDate() : new Date(session.date);
                      
                      return (
                        <div key={session.id} className="session-item">
                          <div className="session-item-header">
                            <h3>{session.title}</h3>
                            <span className={`section-badge ${session.section?.toLowerCase() || ''}`}>
                              {session.section} Section
                            </span>
                          </div>
                          
                          <div className="session-item-details">
                            <p><strong>Time:</strong> {format(sessionDate, 'h:mm a')}</p>
                            <p><strong>Location:</strong> {session.location || 'No location specified'}</p>
                            {session.description && (
                              <p><strong>Description:</strong> {session.description}</p>
                            )}
                          </div>
                          
                          <div className="session-actions">
                            <button onClick={() => handleViewSession(session)}>View Details</button>
                            {(canManageSessions || session.createdBy === user.uid) && (
                              <>
                                <button className="edit-button" onClick={() => handleEditSession(session)}>Edit</button>
                                <button className="delete-button" onClick={() => handleConfirmDelete(session)}>Delete</button>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Meetings Section */}
              {meetingsForSelectedDate.length > 0 && (
                <div className="date-events-section">
                  <h4>Leader Meetings</h4>
                  <div className="date-sessions-list">
                    {meetingsForSelectedDate.map(meeting => {
                      const meetingDate = meeting.date.toDate ? meeting.date.toDate() : new Date(meeting.date);
                      
                      return (
                        <div key={meeting.id} className="meeting-item">
                          <div className="meeting-details">
                            <div className="meeting-title">{meeting.title}</div>
                            <div className="meeting-info">
                              <span><strong>Time:</strong> {format(meetingDate, 'h:mm a')}</span>
                              <span><strong>Location:</strong> {meeting.location || 'No location specified'}</span>
                            </div>
                            {meeting.attendees && meeting.attendees.length > 0 && (
                              <p><strong>Attendees:</strong> {meeting.attendees.join(', ')}</p>
                            )}
                          </div>
                          
                          <div className="meeting-actions">
                            <button onClick={() => handleViewMeeting(meeting)}>View Details</button>
                            {(canManageMeetings || meeting.createdBy === user.uid) && (
                              <>
                                <button className="edit-button" onClick={() => handleEditMeeting(meeting)}>Edit</button>
                                <button className="delete-button" onClick={() => handleConfirmDeleteMeeting(meeting)}>Delete</button>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {sessionsForSelectedDate.length === 0 && meetingsForSelectedDate.length === 0 && (
                <p>No events scheduled for this date.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && (
        <div className="modal-overlay">
          <div className="user-modal">
            <div className="modal-header">
              <h2>Leader Details</h2>
              <button className="close-button" onClick={() => setShowUserModal(false)}>×</button>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  value={leaderDetails.firstName} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  value={leaderDetails.lastName} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="section">Section</label>
                <select 
                  id="section" 
                  name="section" 
                  value={leaderDetails.section} 
                  onChange={handleInputChange}
                >
                  <option value="Beavers">Beavers</option>
                  <option value="Cubs">Cubs</option>
                  <option value="Scouts">Scouts</option>
                  <option value="Explorers">Explorers</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="role">Role</label>
                {hasRole('GSL') ? (
                  <select 
                    id="role" 
                    name="role" 
                    value={leaderDetails.role} 
                    onChange={handleInputChange}
                  >
                    <option value="">Select a role...</option>
                    {user?.email === 'drhassankanso@gmail.com' && (
                      <option value="GSL">GSL</option>
                    )}
                    <option value="Group Leader (Male)">Group Leader (Male)</option>
                    <option value="Group Leader (Female)">Group Leader (Female)</option>
                    <option value="Leader">Section Leader</option>
                    <option value="Assistant Leader">Assistant Leader</option>
                  </select>
                ) : (
                  <div className="role-display">{leaderDetails.role || 'Not assigned yet (GSL will assign)'}</div>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={leaderDetails.phone} 
                  onChange={handleInputChange}
                  placeholder="Optional"
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" onClick={() => setShowUserModal(false)}>Cancel</button>
                <button type="submit" className="primary-button" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Details'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
