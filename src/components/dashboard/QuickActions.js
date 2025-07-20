import React from 'react';
import { useNavigate } from 'react-router-dom';
import './modern-dashboard.css';

const QuickActions = ({ 
  canManageSessions, 
  canManageMeetings, 
  setShowSessionModal, 
  setShowMeetingModal 
}) => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Badge Tracker',
      description: 'Track member badge progress',
      icon: '🏅',
      onClick: () => navigate('/badges'),
      visible: true
    },
    {
      title: 'Member Database',
      description: 'Manage scout members',
      icon: '👥',
      onClick: () => navigate('/members'),
      visible: true
    },
    {
      title: 'Session Planner',
      description: 'Plan scout sessions',
      icon: '📋',
      onClick: () => navigate('/planner'),
      visible: canManageSessions
    },
    {
      title: 'Create Session',
      description: 'Schedule a new session',
      icon: '➕',
      onClick: () => setShowSessionModal(true),
      visible: canManageSessions
    },
    {
      title: 'Create Meeting',
      description: 'Schedule a new meeting',
      icon: '📅',
      onClick: () => setShowMeetingModal(true),
      visible: canManageMeetings
    },
    {
      title: 'Admin Panel',
      description: 'Administrative functions',
      icon: '⚙️',
      onClick: () => navigate('/admin'),
      visible: canManageMeetings
    }
  ];

  const visibleActions = actions.filter(action => action.visible);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Quick Actions</h3>
      </div>
      <div className="card-body">
        <div className="actions-grid">
          {visibleActions.map((action, index) => (
            <div 
              key={index}
              className="action-card scale-in"
              onClick={action.onClick}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="action-icon">{action.icon}</div>
              <div className="action-title">{action.title}</div>
              <div className="action-description">{action.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;