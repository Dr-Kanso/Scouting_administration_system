import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberList from './MemberList';
import BadgeLibrary from './BadgeLibrary';
import TabSelector from '../common/TabSelector';
import NavigationHeader from '../dashboard/NavigationHeader';
import UserDetailsModal from '../dashboard/UserDetailsModal';
import { useAuth } from '../../hooks/useAuth';
import './BadgeTracker.css';

export default function BadgeTracker() {
  const [activeTab, setActiveTab] = useState('members');
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const navigate = useNavigate();
  
  const {
    user,
    leaderDetails,
    showUserModal,
    setShowUserModal,
    loading,
    handleLogout,
    canManageSessions,
    canManageMeetings
  } = useAuth();

  // Tab configuration
  const tabs = [
    {
      id: 'members',
      label: 'Members',
      icon: '👥'
    },
    {
      id: 'badges',
      label: 'Badge Library',
      icon: '🏅'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: '📊'
    }
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="badge-tracker-container">
      <NavigationHeader
        user={user}
        leaderDetails={leaderDetails}
        setShowUserModal={setShowUserModal}
        handleLogout={handleLogout}
        canManageSessions={canManageSessions}
        canManageMeetings={canManageMeetings}
      />

      <TabSelector
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="badge-tracker-tabs"
      />

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
      
      {showUserModal && (
        <UserDetailsModal
          user={user}
          leaderDetails={leaderDetails}
          onClose={() => setShowUserModal(false)}
        />
      )}
    </div>
  );
}
