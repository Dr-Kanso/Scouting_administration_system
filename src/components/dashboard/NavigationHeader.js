import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './modern-dashboard.css';

const NavigationHeader = ({ 
  user, 
  leaderDetails, 
  setShowUserModal, 
  handleLogout, 
  canManageSessions, 
  canManageMeetings 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active nav item based on current route
  const getNavItemClass = (path) => {
    return location.pathname === path ? 'nav-item active' : 'nav-item';
  };

  return (
    <header className="modern-header">
      <div className="header-wrapper">
        <div className="header-top">
          <div className="logo-section" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
            <img src={logo} alt="14th Willesden Logo" className="logo" />
            <h1 className="app-title">14th Willesden Scouts</h1>
          </div>
          
          <div className="user-section">
            <div className="user-info">
              <div className="user-avatar">
                {(leaderDetails.firstName || user?.email || 'U').charAt(0).toUpperCase()}
              </div>
              <span className="user-name">
                {leaderDetails.firstName || user?.email}
              </span>
              {leaderDetails.firstName && (
                <span className="role-badge">
                  {leaderDetails.role} • {leaderDetails.section}
                </span>
              )}
            </div>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowUserModal(true)}
            >
              My Details
            </button>
            <button 
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <nav className="modern-nav">
          <button onClick={() => navigate('/dashboard')} className={getNavItemClass('/dashboard')}>
            Dashboard
          </button>
          <button onClick={() => navigate('/badges')} className={getNavItemClass('/badges')}>
            Badge Tracker
          </button>
          <button onClick={() => navigate('/members')} className={getNavItemClass('/members')}>
            Members
          </button>
          {canManageSessions && (
            <button onClick={() => navigate('/planner')} className={getNavItemClass('/planner')}>
              Planner
            </button>
          )}
          {canManageMeetings && (
            <button onClick={() => navigate('/admin')} className={getNavItemClass('/admin')}>
              Admin
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavigationHeader;