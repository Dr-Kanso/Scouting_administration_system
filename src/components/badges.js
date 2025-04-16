import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './badges.css';
import logo from '../assets/logo.png';
import { auth } from '../utils/firebase';
import { getMembersBySection, addBadgeToMember, removeBadgeFromMember } from '../services/memberService';
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

export default function Badges() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  
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
  const [viewMode, setViewMode] = useState('individual'); // 'individual' or 'summary'

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
    setViewMode('individual');
  };

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setSelectedCategory(null);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'individual' ? 'summary' : 'individual');
    setSelectedMember(null);
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

  const hasBadge = (member, badgeName) => {
    return member.badges?.some(badge => 
      badge.name === badgeName && badge.section === selectedSection
    );
  };

  return (
    <div className="badges-container">
      <div className="header">
        <img 
          src={logo} 
          alt="14th Willesden Logo" 
          className="logo" 
          onClick={() => navigate('/dashboard')}
        />
        <h1>Scout Badge Tracker</h1>
        <p>{user?.email}</p>
      </div>

      <div className="section-filter">
        <button 
          className={selectedSection === 'Beavers' ? 'active' : ''} 
          onClick={() => handleSectionSelect('Beavers')}
        >
          Beavers
        </button>
        <button 
          className={selectedSection === 'Cubs' ? 'active' : ''} 
          onClick={() => handleSectionSelect('Cubs')}
        >
          Cubs
        </button>
        <button 
          className={selectedSection === 'Scouts' ? 'active' : ''} 
          onClick={() => handleSectionSelect('Scouts')}
        >
          Scouts
        </button>
        <button 
          className={selectedSection === 'Explorers' ? 'active' : ''} 
          onClick={() => handleSectionSelect('Explorers')}
        >
          Explorers
        </button>
      </div>

      {selectedSection && members.length > 0 && (
        <div className="view-toggle">
          <button 
            className={viewMode === 'individual' ? 'active' : ''} 
            onClick={() => setViewMode('individual')}
          >
            Individual View
          </button>
          <button 
            className={viewMode === 'summary' ? 'active' : ''} 
            onClick={() => setViewMode('summary')}
          >
            Summary Table
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading members from {selectedSection} section...</div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => loadMembersBySection(selectedSection)}>Try Again</button>
        </div>
      ) : (
        <div className="badge-content">
          {selectedSection && members.length > 0 ? (
            viewMode === 'summary' ? (
              <div className="badges-summary-table">
                <h2>{selectedSection} Badge Summary</h2>
                <div className="table-container">
                  <table className="summary-table">
                    <thead>
                      <tr>
                        <th className="member-name-header">Scout Name</th>
                        {sectionBadgeData[selectedSection].map(badge => (
                          <th key={badge.name} className="badge-header">
                            <div className="badge-header-content">
                              <img 
                                src={badge.image} 
                                alt={badge.name} 
                                className="badge-header-image" 
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://scouts.org.uk/images/default-badge.png';
                                }}
                              />
                              <span className="badge-header-tooltip">{badge.name}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {members.map(member => (
                        <tr key={member.id}>
                          <td className="member-name-cell">
                            {member.firstName} {member.lastName}
                          </td>
                          {sectionBadgeData[selectedSection].map(badge => (
                            <td key={badge.name} className="badge-cell">
                              {hasBadge(member, badge.name) ? 
                                <span className="badge-earned-check">✓</span> : 
                                <button 
                                  className="add-badge-mini" 
                                  onClick={() => {
                                    setSelectedMember(member);
                                    setSelectedBadge({
                                      ...badge,
                                      id: badge.name.replace(/\s+/g, '-').toLowerCase(),
                                    });
                                    setShowBadgeForm(true);
                                  }}
                                >
                                  +
                                </button>
                              }
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <>
                <div className="member-selection">
                  <h2>{selectedSection} Members</h2>
                  <div className="member-list">
                    {members.map(member => (
                      <div 
                        key={member.id} 
                        className={`member-card ${selectedMember?.id === member.id ? 'selected' : ''}`}
                        onClick={() => handleSelectMember(member)}
                      >
                        <h3>{member.firstName} {member.lastName}</h3>
                        <p>Badges: {member.badges?.length || 0}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedMember && (
                  <div className="member-badges">
                    <h2>Badges for {selectedMember.firstName} {selectedMember.lastName}</h2>
                    
                    <div className="badges-tabs">
                      <button 
                        className={!selectedCategory ? 'active' : ''} 
                        onClick={() => setSelectedCategory(null)}
                      >
                        Section Badges
                      </button>
                      <button 
                        className={selectedCategory === 'earned' ? 'active' : ''} 
                        onClick={() => setSelectedCategory('earned')}
                      >
                        Earned Badges ({selectedMember.badges?.length || 0})
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
                            {sectionBadgeData[selectedSection]?.map(badge => {
                              const memberHasBadge = selectedMember.badges?.some(b => 
                                b.name === badge.name && b.section === selectedSection
                              );
                              return (
                                <tr key={badge.name} className={memberHasBadge ? 'earned-row' : ''}>
                                  <td className="badge-image-cell">
                                    <img 
                                      src={badge.image} 
                                      alt={badge.name} 
                                      className="badge-image" 
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://scouts.org.uk/images/default-badge.png';
                                      }}
                                    />
                                  </td>
                                  <td>{badge.name}</td>
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
                                      <span className="badge-earned-icon">✓ Earned</span>
                                    ) : (
                                      <button 
                                        className="add-badge-button" 
                                        onClick={() => handleAddBadge({
                                          ...badge,
                                          id: badge.name.replace(/\s+/g, '-').toLowerCase(),
                                        })}
                                      >
                                        + Add
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
                        <table className="badges-table">
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
                            {selectedMember.badges.map(badge => (
                              <tr key={badge.id}>
                                <td className="badge-image-cell">
                                  <img 
                                    src={badge.image} 
                                    alt={badge.name} 
                                    className="badge-image" 
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = 'https://scouts.org.uk/images/default-badge.png';
                                    }}
                                  />
                                </td>
                                <td>{badge.name} {badge.stage ? `(Stage ${badge.stage})` : ''}</td>
                                <td>{badge.category || 'Section Badge'}</td>
                                <td>
                                  {badge.dateAwarded instanceof Date 
                                    ? badge.dateAwarded.toLocaleDateString() 
                                    : new Date(badge.dateAwarded.seconds * 1000).toLocaleDateString()}
                                </td>
                                <td>{badge.progress || 'No notes'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    
                    {selectedCategory === 'earned' && (!selectedMember.badges || selectedMember.badges.length === 0) && (
                      <div className="no-badges-message">
                        <p>No badges have been earned yet.</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )
          ) : selectedSection ? (
            <div className="no-members">
              <p>No members found in {selectedSection} section.</p>
              <p className="small-text">To add members to this section, go to the Member Database.</p>
              <button onClick={() => navigate('/members')}>Manage Members</button>
            </div>
          ) : (
            <div className="select-section">
              <p>Please select a section to view members and their badges.</p>
            </div>
          )}
        </div>
      )}

      {showBadgeForm && selectedBadge && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowBadgeForm(false)}>&times;</span>
            <h2>Add Badge: {selectedBadge.name}</h2>
            <img 
              src={selectedBadge.image} 
              alt={selectedBadge.name}
              className="badge-form-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://scouts.org.uk/images/default-badge.png';
              }}
            />
            <form onSubmit={handleSubmitBadge}>
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
                  >
                    {[...Array(selectedBadge.stages)].map((_, i) => (
                      <option key={i+1} value={i+1}>Stage {i+1}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <button type="submit">Award Badge</button>
            </form>
          </div>
        </div>
      )}

      <div className="navigation-buttons">
        <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
        <button onClick={() => navigate('/members')}>Manage Members</button>
      </div>
    </div>
  );
}
