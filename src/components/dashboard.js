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
    description: ''
  });
  const [showViewModal, setShowViewModal] = useState(false);
  const [sessionToView, setSessionToView] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateSessionsModalOpen, setDateSessionsModalOpen] = useState(false);
  const [sessionsForSelectedDate, setSessionsForSelectedDate] = useState([]);

  // Fetch user details from Firebase when component mounts
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

  // Enhanced role management
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Enhanced role validation
    if (leaderDetails.role === 'GSL' && user?.email !== 'drhassankanso@gmail.com') {
      setError("Only drhassankanso@gmail.com can be assigned the GSL role.");
      return;
    }
    
    setSaving(true);
    
    try {
      // Save to Firestore with proper role data
      const userDocRef = doc(db, 'leaders', user.uid);
      
      // Create a roles collection document to track role assignments
      const roleData = {
        role: leaderDetails.role,
        section: leaderDetails.section,
        email: user.email,
        uid: user.uid,
        updatedAt: new Date()
      };
      
      // Save the user details with role information
      await setDoc(userDocRef, {
        ...leaderDetails,
        email: user.email,
        uid: user.uid,  // Explicitly save UID
        lastUpdated: new Date(),
        roleAssigned: true,  // Flag to indicate role has been assigned
      }, { merge: true });
      
      // Also save to a roles collection for easier querying of roles
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

  // Add a function to check if a user has a specific role
  const hasRole = (roleToCheck) => {
    if (!leaderDetails || !leaderDetails.role) return false;
    
    if (roleToCheck === 'GSL') {
      return leaderDetails.role === 'GSL' && user?.email === 'drhassankanso@gmail.com';
    }
    
    return leaderDetails.role === roleToCheck;
  };

  // Update canManageSessions to only allow GSL and section leaders
  const canManageSessions = 
    hasRole('GSL') || 
    hasRole('Leader'); // Only Section Leaders (not Group Leaders)

  // Handle creating a new session
  const handleCreateSession = async (e) => {
    e.preventDefault();
    
    try {
      const sessionsRef = collection(db, 'sessions');
      
      // Combine date and time for the session
      const sessionDate = new Date(newSession.date);
      const [startHour, startMinute] = newSession.startTime.split(':');
      sessionDate.setHours(parseInt(startHour), parseInt(startMinute), 0);
      
      await addDoc(sessionsRef, {
        title: newSession.title,
        section: newSession.section,
        date: sessionDate,
        location: newSession.location,
        description: newSession.description,
        createdBy: user.uid,
        createdAt: new Date()
      });
      
      // Reset form and close modal
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
        description: ''
      });
      
      // Refresh sessions data
      fetchUpcomingSessions();
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  const handleNewSessionChange = (e) => {
    const { name, value } = e.target;
    setNewSession(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setNewSession(prev => ({
      ...prev,
      date
    }));
  };

  // Handle editing a session
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
      description: session.description || ''
    });
    
    setSessionToEdit(session);
    setIsEditingSession(true);
    setShowSessionModal(true);
  };

  // Handle updating a session
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
        updatedAt: new Date(),
        updatedBy: user.uid
      });
      
      // Reset form and close modal
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
        description: ''
      });
      
      // Refresh sessions data
      fetchUpcomingSessions();
    } catch (error) {
      console.error("Error updating session:", error);
    }
  };

  // Handle confirming delete
  const handleConfirmDelete = (session) => {
    setSessionToDelete(session);
    setShowDeleteConfirm(true);
  };

  // Handle deleting a session
  const handleDeleteSession = async () => {
    try {
      const sessionRef = doc(db, 'sessions', sessionToDelete.id);
      await deleteDoc(sessionRef);
      
      // Close confirmation and refresh data
      setShowDeleteConfirm(false);
      setSessionToDelete(null);
      fetchUpcomingSessions();
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  // Handle viewing a session
  const handleViewSession = (session) => {
    setSessionToView(session);
    setShowViewModal(true);
  };

  // Handle clicking on a calendar day to view sessions
  const handleCalendarDayClick = (day, dayEvents) => {
    if (dayEvents.length > 0) {
      setSelectedDate(day);
      setSessionsForSelectedDate(dayEvents);
      setDateSessionsModalOpen(true);
    }
  };

  // Fetch upcoming sessions
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
        ...doc.data()
      }));
      
      setUpcomingSessions(sessionsData);
    } catch (error) {
      console.error("Error fetching upcoming sessions:", error);
    }
  };

  useEffect(() => {
    fetchUpcomingSessions();
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
            const dayEvents = upcomingSessions.filter(session => {
              if (!session.date) return false;
              const sessionDate = session.date.toDate ? session.date.toDate() : new Date(session.date);
              return isSameDay(sessionDate, day);
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
                    className={`session-event ${event.section?.toLowerCase() || ''}`}
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
          alt="14th Willesden Logo" 
          className="logo" 
          onClick={() => navigate('/dashboard')}
        />
        <div className="title-area">
          <h1>Welcome to 14th Willesden Scouts</h1>
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
          👤 Manage Leader Details
        </div>
      </div>
      
      {/* Upcoming Sessions Section */}
      <div className="upcoming-sessions">
        <h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Sessions and meetings
          {canManageSessions && (
            <button 
              className="add-session-button"
              onClick={() => setShowSessionModal(true)}
            >
              + Add Meeting
            </button>
          )}
        </h2>
        
        {renderCalendar()}
        
        <div className="session-list">
          <h3>Next 5 Sessions</h3>
          {upcomingSessions.length > 0 ? (
            upcomingSessions.slice(0, 5).map(session => {
              const sessionDate = session.date.toDate ? session.date.toDate() : new Date(session.date);
              
              return (
                <div key={session.id} className="session-item">
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
                      <span>{session.section} Section</span>
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
      </div>

      {/* Modify session modal to handle both creating and editing */}
      {showSessionModal && (
        <div className="modal-overlay">
          <div className="user-modal">
            <div className="modal-header">
              <h2>{isEditingSession ? 'Edit Meeting' : 'Create New Meeting'}</h2>
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
                    onChange={(e) => handleDateChange(new Date(e.target.value))}
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
                  {isEditingSession ? 'Update Meeting' : 'Create Meeting'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add delete confirmation modal */}
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
              <p><strong>{sessionToDelete.title}</strong> on {sessionToDelete.date.toDate().toLocaleDateString()}</p>
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

      {/* View Session Modal */}
      {showViewModal && sessionToView && (
        <div className="modal-overlay">
          <div className="view-modal">
            <div className="modal-header">
              <h2>{sessionToView.title}</h2>
              <button className="close-button" onClick={() => {
                setShowViewModal(false);
                setSessionToView(null);
              }}>×</button>
            </div>
            
            <div className="view-content">
              <div className="session-detail-row">
                <div className="detail-label">Section:</div>
                <div className="detail-value">{sessionToView.section}</div>
              </div>
              
              <div className="session-detail-row">
                <div className="detail-label">Date:</div>
                <div className="detail-value">
                  {sessionToView.date.toDate 
                    ? sessionToView.date.toDate().toLocaleDateString() 
                    : new Date(sessionToView.date).toLocaleDateString()}
                </div>
              </div>
              
              <div className="session-detail-row">
                <div className="detail-label">Time:</div>
                <div className="detail-value">
                  {sessionToView.date.toDate 
                    ? format(sessionToView.date.toDate(), 'h:mm a') 
                    : format(new Date(sessionToView.date), 'h:mm a')}
                </div>
              </div>
              
              <div className="session-detail-row">
                <div className="detail-label">Location:</div>
                <div className="detail-value">{sessionToView.location || 'No location specified'}</div>
              </div>
              
              {sessionToView.description && (
                <div className="session-detail-row">
                  <div className="detail-label">Description:</div>
                  <div className="detail-value description">{sessionToView.description}</div>
                </div>
              )}
              
              {/* Show creator info if available */}
              {sessionToView.createdBy && (
                <div className="session-creator">
                  Created by: {sessionToView.createdBy === user.uid ? 'You' : 'Another leader'}
                </div>
              )}
            </div>
            
            <div className="modal-actions">
              <button onClick={() => {
                setShowViewModal(false);
                setSessionToView(null);
              }}>Close</button>
              
              {/* Only show edit/delete if user has permission or is creator */}
              {(canManageSessions || sessionToView.createdBy === user.uid) && (
                <>
                  <button className="edit-button" onClick={() => {
                    setShowViewModal(false);
                    handleEditSession(sessionToView);
                  }}>Edit</button>
                  <button className="delete-button" onClick={() => {
                    setShowViewModal(false);
                    handleConfirmDelete(sessionToView);
                  }}>Delete</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Date Sessions Modal */}
      {dateSessionsModalOpen && selectedDate && (
        <div className="modal-overlay">
          <div className="view-modal">
            <div className="modal-header">
              <h2>Sessions on {format(selectedDate, 'MMMM d, yyyy')}</h2>
              <button className="close-button" onClick={() => {
                setDateSessionsModalOpen(false);
                setSelectedDate(null);
              }}>×</button>
            </div>
            
            <div className="view-content">
              {sessionsForSelectedDate.length === 0 ? (
                <p>No sessions scheduled for this date.</p>
              ) : (
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
                          {session.badges && (
                            <p><strong>Badges:</strong> {session.badges}</p>
                          )}
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
              )}
            </div>
          </div>
        </div>
      )}

      {/* Ensure the user modal opens correctly */}
      {showUserModal && (
        <div 
          className="modal-overlay" 
          onClick={(e) => {
            // Only close if the click is directly on the overlay, not on the modal content
            if (e.target === e.currentTarget) {
              setShowUserModal(false);
            }
          }}
        >
          <div className="user-modal">
            <div className="modal-header">
              <h2>Leader Details</h2>
              <button 
                className="close-button" 
                onClick={() => setShowUserModal(false)}
                aria-label="Close"
              >×</button>
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
                {leaderDetails.role === 'GSL' && user?.email !== 'drhassankanso@gmail.com' && (
                  <div className="role-warning">Only drhassankanso@gmail.com can select the GSL role.</div>
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
