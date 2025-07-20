import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  return (
    <div className={`loading-container loading-${size}`}>
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

// Loading skeleton for dashboard sections
export const DashboardSkeleton = () => {
  return (
    <div className="dashboard-skeleton">
      <div className="skeleton-header">
        <div className="skeleton-logo"></div>
        <div className="skeleton-nav">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton-nav-item"></div>
          ))}
        </div>
      </div>
      
      <div className="skeleton-content">
        <div className="skeleton-main">
          <div className="skeleton-calendar">
            <div className="skeleton-calendar-header"></div>
            <div className="skeleton-calendar-grid">
              {[...Array(35)].map((_, i) => (
                <div key={i} className="skeleton-calendar-day"></div>
              ))}
            </div>
          </div>
          
          <div className="skeleton-actions">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-action-card"></div>
            ))}
          </div>
        </div>
        
        <div className="skeleton-sidebar">
          <div className="skeleton-section">
            <div className="skeleton-section-header"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton-list-item"></div>
            ))}
          </div>
          
          <div className="skeleton-section">
            <div className="skeleton-section-header"></div>
            {[...Array(2)].map((_, i) => (
              <div key={i} className="skeleton-list-item"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;