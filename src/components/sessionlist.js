import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../utils/firebase';
import { collection, getDocs, query, orderBy, where, doc, getDoc, deleteDoc } from 'firebase/firestore';
import './sessionlist.css';

export default function SessionList() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leaderDetails, setLeaderDetails] = useState(null);
  const [canManageSessions, setCanManageSessions] = useState(false);
  
  // Filtering states - initialize empty and will be set after leader details are loaded
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    section: '', // Start with empty section, will be set to leader's section
    badge: ''
  });
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSessionId, setDeleteSessionId] = useState(null);

  // Fetch leader details to get their section and role
  useEffect(() => {
    const fetchLeaderDetails = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const leaderDocRef = doc(db, 'leaders', user.uid);
          const leaderDoc = await getDoc(leaderDocRef);
          
          if (leaderDoc.exists()) {
            const details = leaderDoc.data();
            setLeaderDetails(details);
            
            // Set the default section filter to match the leader's section
            if (details.section) {
              setFilters(prev => ({
                ...prev,
                section: details.section.toLowerCase()
              }));
            }
            
            // Check if leader has permission to manage sessions
            const isGSL = details.role === 'GSL' && user.email === 'drhassankanso@gmail.com';
            const isGroupLeader = details.role === 'Group Leader (Male)' || details.role === 'Group Leader (Female)';
            const isSectionLeader = details.role === 'Leader' || details.role === 'Section Leader';
            
            setCanManageSessions(isGSL || isGroupLeader || isSectionLeader);
          }
        }
      } catch (err) {
        console.error("Error fetching leader details:", err);
      }
    };

    fetchLeaderDetails();
  }, []);

  // Fetch sessions with improved filtering
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        if (!leaderDetails) return;
        
        const user = auth.currentUser;
        if (!user) {
          navigate('/');
          return;
        }

        setLoading(true);
        let sessionsQuery;
        
        // GSL and Group Leaders can see all sessions
        if (leaderDetails.role === 'GSL' || 
            leaderDetails.role === 'Group Leader (Male)' || 
            leaderDetails.role === 'Group Leader (Female)') {
          // Simplified query - just order by createdAt without compound where clauses
          sessionsQuery = query(
            collection(db, 'sessions'),
            orderBy('createdAt', 'desc')
          );
        } else {
          // Section Leaders see only their section's sessions
          sessionsQuery = query(
            collection(db, 'sessions'),
            where('section', '==', leaderDetails.section)
          );
        }
        
        console.log("Executing query with section:", leaderDetails.section);
        const snapshot = await getDocs(sessionsQuery);
        console.log("Query returned:", snapshot.docs.length, "documents");
        
        // Process and filter results client-side
        const data = snapshot.docs.map(doc => {
          const docData = doc.data();
          console.log("Session document:", doc.id, "data:", docData);
          return {
            id: doc.id,
            ...docData
          };
        });
        
        // Filter out meetings and ensure isSessionPlan is true
        // Two conditions to filter: 
        // 1. isSessionPlan must not be false
        // 2. If type exists, it must not be 'meeting'
        const filteredData = data.filter(session => 
          session.isSessionPlan !== false && 
          session.type !== 'meeting' &&
          session.isMeeting !== true
        );
        
        // Sort by createdAt if we couldn't use orderBy in the query
        if (leaderDetails.role !== 'GSL' && 
            leaderDetails.role !== 'Group Leader (Male)' && 
            leaderDetails.role !== 'Group Leader (Female)') {
          filteredData.sort((a, b) => {
            const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
            const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
            return dateB - dateA; // descending order
          });
        }
        
        setSessions(filteredData);
        setFilteredSessions(filteredData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading sessions:', error);
        alert('Error loading sessions: ' + error.message);
        setLoading(false);
      }
    };

    if (leaderDetails) {
      fetchSessions();
    }
  }, [leaderDetails, navigate]);

  // Apply filters when filter state changes
  useEffect(() => {
    if (sessions.length === 0) return;
    
    let result = [...sessions];
    
    // Section filter
    if (filters.section !== 'all') {
      result = result.filter(session => 
        (session.section?.toLowerCase() === filters.section) || 
        (session.group?.toLowerCase() === filters.section)
      );
    }
    
    // Date range filter
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      fromDate.setHours(0, 0, 0, 0);
      result = result.filter(session => {
        const sessionDate = session.date?.toDate ? session.date.toDate() : new Date(session.date);
        return sessionDate >= fromDate;
      });
    }
    
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999);
      result = result.filter(session => {
        const sessionDate = session.date?.toDate ? session.date.toDate() : new Date(session.date);
        return sessionDate <= toDate;
      });
    }
    
    // Badge filter
    if (filters.badge) {
      const badgeQuery = filters.badge.toLowerCase();
      result = result.filter(session => 
        session.badges?.toLowerCase().includes(badgeQuery)
      );
    }
    
    setFilteredSessions(result);
  }, [filters, sessions]);

  const formatDate = (dateField) => {
    if (!dateField) return 'No date';
    
    try {
      // Check if it's a Firestore timestamp
      if (dateField.toDate) {
        return dateField.toDate().toLocaleDateString();
      }
      
      // Check if it's already a Date object
      if (dateField instanceof Date) {
        return dateField.toLocaleDateString();
      }
      
      // Otherwise, try to parse it
      return new Date(dateField).toLocaleDateString();
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset filters to return to the leader's section
  const resetFilters = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      section: leaderDetails?.section?.toLowerCase() || 'all',
      badge: ''
    });
  };

  // Handle session deletion
  const handleDeleteSession = async (sessionId) => {
    if (!sessionId) return;
    
    // Get the session details first to check who created it
    try {
      const sessionDoc = await getDoc(doc(db, 'sessions', sessionId));
      
      if (!sessionDoc.exists()) {
        alert("Session not found.");
        return;
      }
      
      const sessionData = sessionDoc.data();
      const currentUser = auth.currentUser;
      
      // Check if this session was created by GSL
      const createdByGSL = sessionData.createdByGSL === true;
      
      // Check if current user is GSL (using the same check from earlier code)
      const isCurrentUserGSL = leaderDetails?.role === 'GSL' && 
                               currentUser?.email === 'drhassankanso@gmail.com';
      
      // If created by GSL but current user is not GSL, prevent deletion
      if (createdByGSL && !isCurrentUserGSL) {
        alert("This session was created by the GSL and cannot be deleted by other users.");
        return;
      }
      
      // If user didn't create this session and isn't GSL, prevent deletion
      if (sessionData.createdBy && 
          sessionData.createdBy !== currentUser.uid && 
          !isCurrentUserGSL) {
        alert("You can only delete sessions that you created.");
        return;
      }
      
      // Show confirmation dialog
      if (!window.confirm("Are you sure you want to delete this session plan? This cannot be undone.")) {
        return;
      }
      
      setIsDeleting(true);
      setDeleteSessionId(sessionId);
      
      // Delete the session document
      await deleteDoc(doc(db, 'sessions', sessionId));
      
      // Update local state to remove the deleted session
      setSessions(prevSessions => 
        prevSessions.filter(session => session.id !== sessionId)
      );
      setFilteredSessions(prevFiltered => 
        prevFiltered.filter(session => session.id !== sessionId)
      );
      
      alert("Session plan deleted successfully");
    } catch (error) {
      console.error("Error deleting session:", error);
      alert("Failed to delete session: " + error.message);
    } finally {
      setIsDeleting(false);
      setDeleteSessionId(null);
    }
  };
  
  // Handle view session details
  const handleViewSession = (sessionId) => {
    if (!sessionId) return;
    
    // Store a flag in localStorage to indicate this is coming from the session list
    // This will help the session detail view to format properly
    localStorage.setItem('viewMode', 'planner');
    localStorage.setItem('viewSessionId', sessionId);
    
    // Navigate to the session details page
    navigate(`/session/${sessionId}`);
  };
  
  // Handle session edit - modified to ensure proper navigation to edit mode
  const handleEditSession = (sessionId) => {
    if (!sessionId) return;
    
    // Navigate to the planner with clear edit parameter
    // Using mode=edit to make it clearer this is an edit operation
    navigate(`/planner?mode=edit&sessionId=${sessionId}`);
    
    // Store the session ID in localStorage as a fallback mechanism
    // This helps if query parameters are lost during navigation
    localStorage.setItem('editSessionId', sessionId);
  };

  return (
    <div className="session-list-container">
      <div className="session-list-header">
        <h1>📋 Session Plans</h1>
        <div className="header-buttons">
          <button className="back-button" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
          {canManageSessions && (
            <button className="create-session" onClick={() => navigate('/planner')}>
              Create New Session
            </button>
          )}
        </div>
      </div>
      
      <div className="filter-panel">
        <div className="filter-grid">
          <div className="filter-group">
            <label>Section</label>
            <select name="section" value={filters.section} onChange={handleFilterChange}>
              <option value="all">All Sections</option>
              <option value="beavers">Beavers</option>
              <option value="cubs">Cubs</option>
              <option value="scouts">Scouts</option>
              <option value="explorers">Explorers</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>From Date</label>
            <input 
              type="date" 
              name="dateFrom" 
              value={filters.dateFrom} 
              onChange={handleFilterChange}
            />
          </div>
          
          <div className="filter-group">
            <label>To Date</label>
            <input 
              type="date" 
              name="dateTo" 
              value={filters.dateTo} 
              onChange={handleFilterChange}
            />
          </div>
          
          <div className="filter-group">
            <label>Badge</label>
            <input 
              type="text" 
              name="badge" 
              placeholder="Search badges" 
              value={filters.badge} 
              onChange={handleFilterChange}
            />
          </div>
        </div>
        
        <div className="filter-actions">
          <button className="reset-button" onClick={resetFilters}>
            Reset Filters
          </button>
          <div className="results-count">
            {loading ? 'Loading sessions...' : 
             `Showing ${filteredSessions.length} of ${sessions.length} sessions`}
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading session plans...</p>
        </div>
      ) : filteredSessions.length === 0 ? (
        <div className="no-sessions">
          <div className="empty-state-icon">📝</div>
          <h3>No session plans found</h3>
          <p>
            {filters.dateFrom || filters.dateTo || filters.section !== leaderDetails?.section?.toLowerCase() || filters.badge 
              ? "Try adjusting your filters or" 
              : "Start planning your Scout activities by"} creating a new session plan.
          </p>
          {canManageSessions && (
            <button className="create-session" onClick={() => navigate('/planner')}>
              Create a Session Plan
            </button>
          )}
        </div>
      ) : (
        <div className="sessions-grid">
          {filteredSessions.map(session => (
            <div key={session.id} className="session-card">
              <div className={`session-card-header ${(session.group || session.section)?.toLowerCase() || ''}`}>
                <h2>{session.title || 'Untitled Session'}</h2>
                <span className={`section-tag ${(session.group || session.section)?.toLowerCase() || ''}`}>
                  {session.group || session.section || 'No Section'}
                </span>
              </div>
              
              <div className="session-card-details">
                <div className="session-date-chip">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {formatDate(session.date)}
                </div>
                
                <p className="session-leader">
                  <strong>Leader:</strong> {session.leader || 'Unknown'}
                </p>
                
                {session.badges && (
                  <div className="badge-tags">
                    {session.badges.split(',').map((badge, index) => (
                      <span key={index} className="badge-tag">{badge.trim()}</span>
                    ))}
                  </div>
                )}
                
                {session.description && (
                  <p className="session-description">
                    {session.description.length > 120 
                      ? `${session.description.substring(0, 120)}...` 
                      : session.description}
                  </p>
                )}
              </div>
              
              <div className="session-card-actions">
                <button className="view-button" onClick={() => handleViewSession(session.id)}>
                  View Details
                </button>
                
                {canManageSessions && (
                  <>
                    <button 
                      className="edit-button" 
                      onClick={() => handleEditSession(session.id)}
                      disabled={isDeleting}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-button" 
                      onClick={() => handleDeleteSession(session.id)}
                      disabled={isDeleting || deleteSessionId === session.id}
                    >
                      {deleteSessionId === session.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
