import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberList from './MemberList';
import BadgeLibrary from './BadgeLibrary';
import './BadgeTracker.css';
import { auth } from '../../utils/firebase';

export default function BadgeTracker() {
  const [activeTab, setActiveTab] = useState('members');
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    if (!auth.currentUser) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="badge-tracker-container">
      <div className="badge-tracker-header">
        <h1>Badge Tracker</h1>
        <div className="tabs">
          <button 
            className={activeTab === 'members' ? 'active' : ''} 
            onClick={() => setActiveTab('members')}
          >
            Members
          </button>
          <button 
            className={activeTab === 'badges' ? 'active' : ''} 
            onClick={() => setActiveTab('badges')}
          >
            Badge Library
          </button>
          <button 
            className={activeTab === 'reports' ? 'active' : ''} 
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
        </div>
      </div>

      <div className="badge-tracker-content">
        {activeTab === 'members' && (
          <MemberList 
            onSelectMember={setSelectedMember} 
            selectedMember={selectedMember}
          />
        )}
        {activeTab === 'badges' && (
          <BadgeLibrary 
            onSelectBadge={setSelectedBadge}
            selectedBadge={selectedBadge}
            selectedMember={selectedMember}
          />
        )}
        {activeTab === 'reports' && (
          <div className="reports-container">
            <h2>Badge Completion Reports</h2>
            <p>Reports coming soon...</p>
          </div>
        )}
      </div>

      <button 
        className="back-button" 
        onClick={() => navigate('/dashboard')}
      >
        Back to Dashboard
      </button>
    </div>
  );
}
