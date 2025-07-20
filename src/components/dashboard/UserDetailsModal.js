import React from 'react';
import './modern-dashboard.css';

const UserDetailsModal = ({ 
  showModal, 
  setShowModal, 
  leaderDetails, 
  handleInputChange, 
  handleSubmit, 
  saving, 
  error 
}) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">User Details</h3>
        </div>
        
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                value={leaderDetails.firstName}
                onChange={handleInputChange}
                className="form-input"
                required
                placeholder="Enter your first name"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={leaderDetails.lastName}
                onChange={handleInputChange}
                className="form-input"
                required
                placeholder="Enter your last name"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Section</label>
              <select
                name="section"
                value={leaderDetails.section}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select a section</option>
                <option value="Beavers">Beavers (6-8 years)</option>
                <option value="Cubs">Cubs (8-10½ years)</option>
                <option value="Scouts">Scouts (10½-14 years)</option>
                <option value="Explorers">Explorers (14-18 years)</option>
                <option value="Group">Group Level</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Role</label>
              <select
                name="role"
                value={leaderDetails.role}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select your role</option>
                <option value="Leader">Leader</option>
                <option value="Assistant Leader">Assistant Leader</option>
                <option value="Section Helper">Section Helper</option>
                <option value="Group Leader (Male)">Group Leader (Male)</option>
                <option value="Group Leader (Female)">Group Leader (Female)</option>
                <option value="GSL">Group Scout Leader (GSL)</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={leaderDetails.phone}
                onChange={handleInputChange}
                className="form-input"
                required
                placeholder="Enter your phone number"
              />
            </div>
            
            {error && (
              <div className="error-message" style={{ 
                color: 'var(--explorers-color)', 
                background: 'var(--explorers-light)', 
                padding: 'var(--spacing-sm)', 
                borderRadius: 'var(--radius-md)', 
                fontSize: '0.875rem',
                marginBottom: 'var(--spacing-lg)'
              }}>
                {error}
              </div>
            )}
          </form>
        </div>
        
        <div className="modal-footer">
          <button 
            type="button" 
            onClick={() => setShowModal(false)}
            disabled={saving}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={saving}
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;