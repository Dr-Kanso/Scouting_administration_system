import { useState, useEffect } from 'react';
import { auth, db } from '../utils/firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy 
} from 'firebase/firestore';

export const useDashboard = () => {
  const user = auth.currentUser;
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [meetingsLoading, setMeetingsLoading] = useState(false);
  
  // User state
  const [leaderDetails, setLeaderDetails] = useState({
    firstName: '',
    lastName: '',
    section: 'Beavers',
    role: '',
    phone: ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Session state
  const [upcomingSessions, setUpcomingSessions] = useState([]);
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

  // Meeting state
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
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

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());

  // Fetch user details
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

  // Fetch upcoming sessions
  const fetchUpcomingSessions = async () => {
    setSessionsLoading(true);
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
    } finally {
      setSessionsLoading(false);
    }
  };

  // Fetch upcoming meetings
  const fetchUpcomingMeetings = async () => {
    setMeetingsLoading(true);
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
    } finally {
      setMeetingsLoading(false);
    }
  };

  // Save user details
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
      return true; // Success
    } catch (err) {
      setError("Failed to save user details. Please try again.");
      setSaving(false);
      console.error("Error saving user details:", err);
      return false; // Failure
    }
  };

  // Create session
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
        startTime: newSession.startTime,
        endTime: newSession.endTime,
        location: newSession.location,
        description: newSession.description,
        type: 'session',
        createdBy: user.uid,
        createdAt: new Date()
      });

      // Reset form
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

      await fetchUpcomingSessions();
      return true;
    } catch (error) {
      console.error("Error creating session:", error);
      return false;
    }
  };

  // Create meeting
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
        startTime: newMeeting.startTime,
        endTime: newMeeting.endTime,
        location: newMeeting.location,
        agenda: newMeeting.agenda,
        type: 'meeting',
        createdBy: user.uid,
        createdAt: new Date()
      });

      // Reset form
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

      await fetchUpcomingMeetings();
      return true;
    } catch (error) {
      console.error("Error creating meeting:", error);
      return false;
    }
  };

  // Delete session
  const deleteSession = async (sessionId) => {
    try {
      await deleteDoc(doc(db, 'sessions', sessionId));
      await fetchUpcomingSessions();
      return true;
    } catch (error) {
      console.error("Error deleting session:", error);
      return false;
    }
  };

  // Delete meeting
  const deleteMeeting = async (meetingId) => {
    try {
      await deleteDoc(doc(db, 'meetings', meetingId));
      await fetchUpcomingMeetings();
      return true;
    } catch (error) {
      console.error("Error deleting meeting:", error);
      return false;
    }
  };

  // Role checking
  const hasRole = (roleToCheck) => {
    if (!leaderDetails || !leaderDetails.role) return false;

    if (roleToCheck === 'GSL') {
      return leaderDetails.role === 'GSL' && user?.email === 'drhassankanso@gmail.com';
    }

    return leaderDetails.role === roleToCheck;
  };

  const canManageSessions = hasRole('GSL') || hasRole('Group Leader (Male)') || hasRole('Group Leader (Female)') || hasRole('Leader');
  const canManageMeetings = hasRole('GSL') || hasRole('Group Leader (Male)') || hasRole('Group Leader (Female)');

  // Initial data fetch
  useEffect(() => {
    if (user) {
      const loadInitialData = async () => {
        setLoading(true);
        try {
          await Promise.all([
            fetchUserDetails(),
            fetchUpcomingSessions(),
            fetchUpcomingMeetings()
          ]);
        } finally {
          setLoading(false);
        }
      };
      
      loadInitialData();
    }
  }, [user]);

  return {
    // Loading states
    loading,
    sessionsLoading,
    meetingsLoading,
    
    // User data
    user,
    leaderDetails,
    setLeaderDetails,
    saving,
    error,
    handleSubmit,
    
    // Sessions
    upcomingSessions,
    newSession,
    setNewSession,
    handleCreateSession,
    deleteSession,
    fetchUpcomingSessions,
    
    // Meetings
    upcomingMeetings,
    newMeeting,
    setNewMeeting,
    handleCreateMeeting,
    deleteMeeting,
    fetchUpcomingMeetings,
    
    // Calendar
    currentDate,
    setCurrentDate,
    
    // Permissions
    hasRole,
    canManageSessions,
    canManageMeetings
  };
};