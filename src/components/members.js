import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './members.css';
import logo from '../assets/logo.png';
import { auth } from '../utils/firebase';
import { getAllMembers, getMembersBySection, searchMembersByName, addNewMember, deleteMember, getMemberById } from '../services/memberService';

export default function Members() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({
    firstName: '',
    lastName: '',
    section: 'Beavers',
    dateOfBirth: '',
    notes: ''
  });
  const [viewMember, setViewMember] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  useEffect(() => {
    loadMembers();
  }, [selectedSection]);

  const loadMembers = async () => {
    try {
      setLoading(true);
      const data = selectedSection 
        ? await getMembersBySection(selectedSection)
        : await getAllMembers();
      setMembers(data);
    } catch (error) {
      console.error('Error loading members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadMembers();
      return;
    }
    
    try {
      setLoading(true);
      const results = await searchMembersByName(searchTerm);
      setMembers(results);
    } catch (error) {
      console.error('Error searching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await addNewMember(newMember);
      setNewMember({
        firstName: '',
        lastName: '',
        section: 'Beavers',
        dateOfBirth: '',
        notes: ''
      });
      setShowAddForm(false);
      loadMembers();
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const handleDeleteMember = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await deleteMember(id);
        loadMembers();
      } catch (error) {
        console.error('Error deleting member:', error);
      }
    }
  };

  const handleViewMember = async (id) => {
    try {
      setViewLoading(true);
      const memberData = await getMemberById(id);
      setViewMember(memberData);
    } catch (error) {
      console.error('Error loading member details:', error);
    } finally {
      setViewLoading(false);
    }
  };

  const closeViewModal = () => {
    setViewMember(null);
  };

  return (
    <div className="members-container">
      <div className="header">
        <img src={logo} alt="14th Willesden Logo" className="logo" />
        <h1>Member Database</h1>
        <p>{user?.email}</p>
      </div>

      <div className="section-filter">
        <button 
          className={selectedSection === '' ? 'active' : ''} 
          onClick={() => setSelectedSection('')}
        >
          All Members
        </button>
        <button 
          className={selectedSection === 'Beavers' ? 'active' : ''} 
          onClick={() => setSelectedSection('Beavers')}
        >
          Beavers
        </button>
        <button 
          className={selectedSection === 'Cubs' ? 'active' : ''} 
          onClick={() => setSelectedSection('Cubs')}
        >
          Cubs
        </button>
        <button 
          className={selectedSection === 'Scouts' ? 'active' : ''} 
          onClick={() => setSelectedSection('Scouts')}
        >
          Scouts
        </button>
        <button 
          className={selectedSection === 'Explorers' ? 'active' : ''} 
          onClick={() => setSelectedSection('Explorers')}
        >
          Explorers
        </button>
      </div>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search by name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
        <button className="add-button" onClick={() => setShowAddForm(true)}>Add Member</button>
      </div>

      {loading ? (
        <p>Loading members...</p>
      ) : (
        <div className="members-list">
          <h2>{selectedSection || 'All'} Members ({members.length})</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Section</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id}>
                  <td>{member.firstName} {member.lastName}</td>
                  <td>{member.section}</td>
                  <td>{member.joinDate?.toDate ? member.joinDate.toDate().toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <button onClick={() => handleViewMember(member.id)}>View</button>
                    <button onClick={() => handleDeleteMember(member.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddForm(false)}>&times;</span>
            <h2>Add New Member</h2>
            <form onSubmit={handleAddMember}>
              <div className="form-group">
                <label>First Name</label>
                <input type="text" name="firstName" value={newMember.firstName} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" name="lastName" value={newMember.lastName} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Section</label>
                <select name="section" value={newMember.section} onChange={handleInputChange}>
                  <option value="Beavers">Beavers</option>
                  <option value="Cubs">Cubs</option>
                  <option value="Scouts">Scouts</option>
                  <option value="Explorers">Explorers</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" name="dateOfBirth" value={newMember.dateOfBirth} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea name="notes" value={newMember.notes} onChange={handleInputChange}></textarea>
              </div>
              <button type="submit">Add Member</button>
            </form>
          </div>
        </div>
      )}

      {viewMember && (
        <div className="modal">
          <div className="modal-content member-details">
            <span className="close" onClick={closeViewModal}>&times;</span>
            
            {viewLoading ? (
              <p>Loading member details...</p>
            ) : (
              <>
                <div className="member-header">
                  <h2>{viewMember.firstName} {viewMember.lastName}</h2>
                  <span className={`section-tag ${viewMember.section.toLowerCase()}`}>
                    {viewMember.section}
                  </span>
                </div>
                
                <div className="member-info">
                  <div className="info-item">
                    <strong>Date of Birth:</strong> 
                    {viewMember.dateOfBirth 
                      ? (viewMember.dateOfBirth?.toDate 
                        ? viewMember.dateOfBirth.toDate().toLocaleDateString() 
                        : new Date(viewMember.dateOfBirth).toLocaleDateString())
                      : 'Not provided'}
                  </div>
                  
                  <div className="info-item">
                    <strong>Join Date:</strong> 
                    {viewMember.joinDate 
                      ? (viewMember.joinDate?.toDate 
                        ? viewMember.joinDate.toDate().toLocaleDateString() 
                        : new Date(viewMember.joinDate).toLocaleDateString())
                      : 'Not recorded'}
                  </div>

                  {viewMember.notes && (
                    <div className="info-item">
                      <strong>Notes:</strong>
                      <p>{viewMember.notes}</p>
                    </div>
                  )}
                </div>
                
                <div className="badge-summary">
                  <h3>Badge Progress</h3>
                  
                  {viewMember.badges && viewMember.badges.length > 0 ? (
                    <div className="badges-grid">
                      {viewMember.badges.map(badge => (
                        <div key={badge.id} className="badge-card">
                          <h4>{badge.name}</h4>
                          <p className="badge-category">{badge.category || 'Uncategorized'}</p>
                          {badge.stage && <p className="badge-stage">Stage {badge.stage}</p>}
                          <p className="badge-date">
                            Awarded: {badge.dateAwarded?.toDate 
                              ? badge.dateAwarded.toDate().toLocaleDateString() 
                              : new Date(badge.dateAwarded).toLocaleDateString()}
                          </p>
                          {badge.progress && (
                            <div className="badge-progress">
                              <p>{badge.progress}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-badges">No badges awarded yet</p>
                  )}
                  
                  <div className="badge-buttons">
                    <button 
                      className="badge-tracker-button"
                      onClick={() => {
                        closeViewModal();
                        navigate('/badges');
                      }}
                    >
                      Go to Badge Tracker
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="navigation-buttons">
        <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    </div>
  );
}
