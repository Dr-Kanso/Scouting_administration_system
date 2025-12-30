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
  canManageMeetings,
  hasUnsavedChanges = false,
  onSaveBeforeNavigate = null
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    if (hasUnsavedChanges && onSaveBeforeNavigate) {
      if (window.confirm('You have unsaved changes. Do you want to save before leaving?')) {
        onSaveBeforeNavigate().then(() => navigate(path));
      } else if (window.confirm('Are you sure you want to leave without saving? Your changes will be lost.')) {
        navigate(path);
      }
    } else {
      navigate(path);
    }
  };

  // Determine active nav item based on current route
  const getNavItemClass = (path) => {
    return location.pathname === path ? 'nav-item active' : 'nav-item';
  };

  return (
    <header className="modern-header">
      <div className="header-wrapper">
        <div className="header-top">
          <div className="logo-section" onClick={() => handleNavigation('/dashboard')} style={{ cursor: 'pointer' }}>
            <img src={logo} alt="Hidaya Logo" className="logo" />
            <h1 className="app-title">Hidaya Scouts</h1>
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
          <button onClick={() => handleNavigation('/dashboard')} className={getNavItemClass('/dashboard')}>
            Dashboard
          </button>
          <button onClick={() => handleNavigation('/badges')} className={getNavItemClass('/badges')}>
            Badge Tracker
          </button>
          <button onClick={() => handleNavigation('/members')} className={getNavItemClass('/members')}>
            Members
          </button>
          {canManageSessions && (
            <>
              <button onClick={() => handleNavigation('/sessions')} className={getNavItemClass('/sessions')}>
                Sessions
              </button>
              <button onClick={() => handleNavigation('/planner')} className={getNavItemClass('/planner')}>
                Planner
              </button>
            </>
          )}
          {canManageMeetings && (
            <button onClick={() => handleNavigation('/admin')} className={getNavItemClass('/admin')}>
              Admin
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavigationHeader;