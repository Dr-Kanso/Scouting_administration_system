import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './badges.css';
import NavigationHeader from './dashboard/NavigationHeader';
import UserDetailsModal from './dashboard/UserDetailsModal';
import { useAuth } from '../hooks/useAuth';
import { getMembersBySection, addBadgeToMember } from '../services/memberService';
import beaverBadges from '../data/beaverBadges';
import cubBadges from '../data/cubBadges';
import scoutBadges from '../data/scoutBadges';

// Map section names to their badge data
const sectionBadgeData = {
  'Beavers': beaverBadges,
  'Cubs': cubBadges,
  'Scouts': scoutBadges,
  'Explorers': [] // If you add explorer badges later, update this
};

// Section colors for styling
const sectionColors = {
  'Beavers': '#006ddf',
  'Cubs': '#23a950',
  'Scouts': '#00a794',
  'Explorers': '#003982'
};

export default function Badges() {
  const navigate = useNavigate();
  
  const {
    user,
    leaderDetails,
    showUserModal,
    setShowUserModal,
    loading: authLoading,
    handleLogout,
    canManageSessions,
    canManageMeetings
  } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSection, setSelectedSection] = useState('');
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showBadgeForm, setShowBadgeForm] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [badgeProgress, setBadgeProgress] = useState('');
  const [badgeStage, setBadgeStage] = useState(1);
  
  // User details modal state and functions
  const [userDetailsForm, setUserDetailsForm] = useState({
    firstName: '',
    lastName: '',
    section: '',
    role: '',
    phone: ''
  });
  const [saving, setSaving] = useState(false);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    if (selectedSection) {
      loadMembersBySection(selectedSection);
    } else {
      setMembers([]);
      setSelectedMember(null);
    }
  }, [selectedSection]);

  const loadMembersBySection = async (section) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`Loading members for section: ${section}`);
      
      const data = await getMembersBySection(section);
      console.log(`Loaded ${data.length} members for ${section}:`, data);
      
      setMembers(data);
      setSelectedMember(null);
    } catch (error) {
      console.error('Error loading members:', error);
      setError(`Failed to load members: ${error.message}`);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setSelectedMember(null);
    setSelectedCategory(null);
  };

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setSelectedCategory(null);
  };

  const handleAddBadge = async (badge) => {
    if (!selectedMember) return;
    
    setSelectedBadge(badge);
    setBadgeProgress('');
    setBadgeStage(1);
    setShowBadgeForm(true);
  };

  const handleSubmitBadge = async (e) => {
    e.preventDefault();
    if (!selectedMember || !selectedBadge) return;

    try {
      const badgeData = {
        ...selectedBadge,
        progress: badgeProgress,
        stage: selectedBadge.stages ? badgeStage : null,
        category: selectedCategory || 'Section Badge',
        section: selectedSection
      };
      
      await addBadgeToMember(selectedMember.id, badgeData);
      
      // Refresh member data to show updated badges
      const updatedMembers = [...members];
      const memberIndex = updatedMembers.findIndex(m => m.id === selectedMember.id);
      
      if (memberIndex !== -1) {
        // If the member already has badges, add to the array, otherwise create it
        if (!updatedMembers[memberIndex].badges) {
          updatedMembers[memberIndex].badges = [];
        }
        
        updatedMembers[memberIndex].badges.push({
          ...badgeData,
          id: Date.now().toString(),
          dateAwarded: new Date()
        });
        
        setMembers(updatedMembers);
        setSelectedMember(updatedMembers[memberIndex]);
      }
      
      setShowBadgeForm(false);
    } catch (error) {
      console.error('Error adding badge:', error);
    }
  };

  // User details form handlers
  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetailsForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUserDetailsSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setUserError(null);

    try {
      const { doc, setDoc } = await import('firebase/firestore');
      const { db } = await import('../utils/firebase');
      
      const leaderRef = doc(db, 'leaders', user.uid);
      await setDoc(leaderRef, {
        firstName: userDetailsForm.firstName,
        lastName: userDetailsForm.lastName,
        section: userDetailsForm.section,
        role: userDetailsForm.role,
        phone: userDetailsForm.phone,
        email: user.email,
        uid: user.uid
      }, { merge: true });

      setShowUserModal(false);
      return true;
    } catch (error) {
      console.error('Error updating user details:', error);
      setUserError('Failed to update details. Please try again.');
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Initialize user details form when modal opens
  React.useEffect(() => {
    if (showUserModal && leaderDetails) {
      setUserDetailsForm({
        firstName: leaderDetails.firstName || '',
        lastName: leaderDetails.lastName || '',
        section: leaderDetails.section || 'Beavers',
        role: leaderDetails.role || '',
        phone: leaderDetails.phone || ''
      });
    }
  }, [showUserModal, leaderDetails]);

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="badges-container">
      <NavigationHeader
        user={user}
        leaderDetails={leaderDetails}
        setShowUserModal={setShowUserModal}
        handleLogout={handleLogout}
        canManageSessions={canManageSessions}
        canManageMeetings={canManageMeetings}
      />
      
      <div className="badges-content">
        <div className="badges-page-header">
          <h1><span className="scout-icon">🏅</span> Scout Badge Tracker</h1>
          <p>Award and track badges for Scout members across all sections</p>
        </div>

      <div className="section-filter">
        <button 
          className={`section-button ${selectedSection === 'Beavers' ? 'active beavers' : ''}`} 
          onClick={() => handleSectionSelect('Beavers')}
        >
          <span className="section-icon">🦫</span> Beavers
        </button>
        <button 
          className={`section-button ${selectedSection === 'Cubs' ? 'active cubs' : ''}`} 
          onClick={() => handleSectionSelect('Cubs')}
        >
          <span className="section-icon">🐺</span> Cubs
        </button>
        <button 
          className={`section-button ${selectedSection === 'Scouts' ? 'active scouts' : ''}`} 
          onClick={() => handleSectionSelect('Scouts')}
        >
          <span className="section-icon">⚜️</span> Scouts
        </button>
        <button 
          className={`section-button ${selectedSection === 'Explorers' ? 'active explorers' : ''}`} 
          onClick={() => handleSectionSelect('Explorers')}
        >
          <span className="section-icon">🧭</span> Explorers
        </button>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading members from {selectedSection} section...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>⚠️ {error}</p>
          <button className="retry-button" onClick={() => loadMembersBySection(selectedSection)}>Try Again</button>
        </div>
      ) : (
        <div className="badge-content">
          {selectedSection && members.length > 0 ? (
            <>
              <div className="member-selection">
                <h2 className={`section-title ${selectedSection.toLowerCase()}`}>
                  <span className="section-icon">
                    {selectedSection === 'Beavers' && '🦫'}
                    {selectedSection === 'Cubs' && '🐺'}
                    {selectedSection === 'Scouts' && '⚜️'}
                    {selectedSection === 'Explorers' && '🧭'}
                  </span> 
                  {selectedSection} Members
                </h2>
                <div className="member-list">
                  {members.map(member => (
                    <div 
                      key={member.id} 
                      className={`member-card ${selectedMember?.id === member.id ? 'selected' : ''}`}
                      onClick={() => handleSelectMember(member)}
                      style={selectedMember?.id === member.id ? 
                        { borderColor: sectionColors[selectedSection] } : {}}
                    >
                      <h3>{member.firstName} {member.lastName}</h3>
                      <div className="badge-count">
                        <span className="badge-icon">🏅</span>
                        <span>{member.badges?.length || 0} Badges</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedMember && (
                <div className="member-badges">
                  <h2 className="member-badges-title">
                    <span className="badge-icon">🏅</span>
                    Badges for {selectedMember.firstName} {selectedMember.lastName}
                  </h2>
                  
                  <div className="badges-tabs">
                    <button 
                      className={`tab-button ${!selectedCategory ? 'active' : ''}`} 
                      onClick={() => setSelectedCategory(null)}
                    >
                      <span className="tab-icon">🎯</span> Available Badges
                    </button>
                    <button 
                      className={`tab-button ${selectedCategory === 'earned' ? 'active' : ''}`} 
                      onClick={() => setSelectedCategory('earned')}
                    >
                      <span className="tab-icon">🏆</span> Earned Badges ({selectedMember.badges?.length || 0})
                    </button>
                  </div>
                  
                  {!selectedCategory && (
                    <div className="badges-table-container">
                      <table className="badges-table">
                        <thead>
                          <tr>
                            <th>Badge</th>
                            <th>Name</th>
                            <th>Requirements</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sectionBadgeData[selectedSection]?.map((badge, index) => {
                            const memberHasBadge = selectedMember.badges?.some(b => 
                              b.name === badge.name && b.section === selectedSection
                            );
                            return (
                              <tr key={badge.name} 
                                  className={`${memberHasBadge ? 'earned-row' : ''} ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}>
                                <td className="badge-image-cell">
                                  <div className="badge-image-wrapper">
                                    <img 
                                      src={badge.image} 
                                      alt={badge.name} 
                                      className="badge-image" 
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://scouts.org.uk/images/default-badge.png';
                                      }}
                                    />
                                  </div>
                                </td>
                                <td className="badge-name-cell">{badge.name}</td>
                                <td>
                                  <ul className="requirements-list">
                                    {badge.steps.slice(0, 2).map((step, index) => (
                                      <li key={index}>{step}</li>
                                    ))}
                                    {badge.steps.length > 2 && <li>...and {badge.steps.length - 2} more</li>}
                                  </ul>
                                  <a href={badge.url} target="_blank" rel="noopener noreferrer" className="badge-link">
                                    View full requirements
                                  </a>
                                </td>
                                <td>
                                  {memberHasBadge ? (
                                    <span className="badge-earned-icon">✅ Earned</span>
                                  ) : (
                                    <button 
                                      className="add-badge-button" 
                                      onClick={() => handleAddBadge({
                                        ...badge,
                                        id: badge.name.replace(/\s+/g, '-').toLowerCase(),
                                      })}
                                    >
                                      <span className="add-icon">+</span> Add Badge
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  {selectedCategory === 'earned' && selectedMember.badges && selectedMember.badges.length > 0 && (
                    <div className="earned-badges-table-container">
                      <table className="badges-table earned-badges-table">
                        <thead>
                          <tr>
                            <th>Badge</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Awarded Date</th>
                            <th>Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedMember.badges.map((badge, index) => (
                            <tr key={badge.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                              <td className="badge-image-cell">
                                <div className="badge-image-wrapper earned">
                                  <img 
                                    src={badge.image} 
                                    alt={badge.name} 
                                    className="badge-image" 
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = 'https://scouts.org.uk/images/default-badge.png';
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="badge-name-cell">
                                {badge.name} 
                                {badge.stage && <span className="badge-stage">Stage {badge.stage}</span>}
                              </td>
                              <td>{badge.category || 'Section Badge'}</td>
                              <td className="date-cell">
                                {badge.dateAwarded instanceof Date 
                                  ? badge.dateAwarded.toLocaleDateString() 
                                  : new Date(badge.dateAwarded.seconds * 1000).toLocaleDateString()}
                              </td>
                              <td className="notes-cell">{badge.progress || 'No notes'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  {selectedCategory === 'earned' && (!selectedMember.badges || selectedMember.badges.length === 0) && (
                    <div className="no-badges-message">
                      <div className="empty-state-icon">🏅</div>
                      <p>No badges have been earned yet.</p>
                      <p>Switch to the Available Badges tab to award badges to this scout.</p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : selectedSection ? (
            <div className="no-members">
              <div className="empty-state-icon">👥</div>
              <h3>No members found in {selectedSection} section</h3>
              <p>To add members to this section, go to the Member Database.</p>
              <button onClick={() => navigate('/members')} className="action-button">
                Manage Members
              </button>
            </div>
          ) : (
            <div className="select-section">
              <div className="empty-state-icon">🧭</div>
              <h3>Please select a section</h3>
              <p>Choose a section above to view members and their badges.</p>
            </div>
          )}
        </div>
      )}

      {showBadgeForm && selectedBadge && (
        <div className="modal">
          <div className="modal-content badge-form-modal">
            <span className="close" onClick={() => setShowBadgeForm(false)}>&times;</span>
            <h2 className="badge-form-title">Award Badge: {selectedBadge.name}</h2>
            <div className="badge-preview">
              <img 
                src={selectedBadge.image} 
                alt={selectedBadge.name}
                className="badge-form-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://scouts.org.uk/images/default-badge.png';
                }}
              />
              <p className="badge-form-section">{selectedSection} Badge</p>
            </div>
            <form onSubmit={handleSubmitBadge} className="badge-award-form">
              <div className="form-group">
                <label>Progress Notes</label>
                <textarea 
                  value={badgeProgress}
                  onChange={(e) => setBadgeProgress(e.target.value)}
                  placeholder="Enter details about how this badge was earned..."
                ></textarea>
              </div>
              
              {selectedBadge.stages && (
                <div className="form-group">
                  <label>Stage Completed</label>
                  <select 
                    value={badgeStage}
                    onChange={(e) => setBadgeStage(parseInt(e.target.value))}
                    className="stage-select"
                  >
                    {[...Array(selectedBadge.stages)].map((_, i) => (
                      <option key={i+1} value={i+1}>Stage {i+1}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <button type="submit" className="award-badge-button">Award Badge</button>
            </form>
          </div>
        </div>
      )}
      </div>
      
      {showUserModal && (
        <UserDetailsModal
          showModal={showUserModal}
          setShowModal={setShowUserModal}
          leaderDetails={userDetailsForm}
          handleInputChange={handleUserInputChange}
          handleSubmit={handleUserDetailsSubmit}
          saving={saving}
          error={userError}
          user={user}
        />
      )}
    </div>
  );
}
