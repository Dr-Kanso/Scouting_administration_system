import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import logo from '../assets/logo.png';
import { auth, db } from '../utils/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    
    try {
      // Save to Firestore
      const userDocRef = doc(db, 'leaders', user.uid);
      await setDoc(userDocRef, {
        ...leaderDetails,
        email: user.email,
        lastUpdated: new Date()
      }, { merge: true });
      
      setSaving(false);
      setShowUserModal(false);
    } catch (err) {
      setError("Failed to save user details. Please try again.");
      setSaving(false);
      console.error("Error saving user details:", err);
    }
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
        <h1>Welcome to 14th Willesden Scouts</h1>
        <div className="user-info">
          <p>{user?.email}</p>
          <button className="signout-button" onClick={handleLogout}>Sign Out</button>
          {leaderDetails.firstName && (
            <span className="leader-badge">
              {leaderDetails.firstName} {leaderDetails.lastName && leaderDetails.lastName.charAt(0)}
              {leaderDetails.section && ` - ${leaderDetails.section}`}
            </span>
          )}
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
        <div className="card" onClick={() => navigate('/calendar')}>
          🗓️ Upcoming Sessions
        </div>
        <div className="card" onClick={() => navigate('/sessions')}>
          📋 Session List
        </div>
        <div className="card" onClick={() => navigate('/members')}>
          👥 Member Database
        </div>
        <div className="card manage-user-card" onClick={() => setShowUserModal(true)}>
          👤 Manage Leader Details
        </div>
      </div>

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
                <input 
                  type="text" 
                  id="role" 
                  name="role" 
                  value={leaderDetails.role} 
                  onChange={handleInputChange}
                  placeholder="e.g. Section Leader, Assistant, etc."
                />
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
