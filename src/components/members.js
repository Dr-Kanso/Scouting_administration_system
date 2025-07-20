import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './members.css';
import logo from '../assets/logo.png';
import { auth, db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getAllMembers, getMembersBySection, searchMembersByName, addNewMember, deleteMember, getMemberById, updateMember } from '../services/memberService';
import TabSelector from './common/TabSelector';
import NavigationHeader from './dashboard/NavigationHeader';
import UserDetailsModal from './dashboard/UserDetailsModal';
import { useAuth } from '../hooks/useAuth';
import * as XLSX from 'xlsx';

// Helper function to calculate age from date of birth
const calculateAge = (birthDateString) => {
  if (!birthDateString) return null;
  
  // Handle both string dates and Firestore timestamp objects
  const birthDate = birthDateString.toDate ? 
    birthDateString.toDate() : 
    new Date(birthDateString);
  
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // If birthday hasn't occurred yet this year, subtract 1
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export default function Members() {
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
  
  const [activeTab, setActiveTab] = useState('list');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newMember, setNewMember] = useState({
    firstName: '',
    lastName: '',
    section: 'Beavers',
    dateOfBirth: '',
    notes: '',
    phone: '',
    email: ''
  });
  const [editMember, setEditMember] = useState(null);
  const [viewMember, setViewMember] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [canDeleteMembers, setCanDeleteMembers] = useState(false);

  // Tab configuration
  const tabs = [
    {
      id: 'list',
      label: 'Member List',
      icon: '📋',
      badge: members.length > 0 ? members.length : null
    },
    {
      id: 'add',
      label: 'Add Member',
      icon: '➕'
    }
  ];

  // Check permissions for deleting members
  useEffect(() => {
    if (leaderDetails && user) {
      const isGSL = leaderDetails.role === 'GSL' && user.email === 'drhassankanso@gmail.com';
      const isSectionLeader = leaderDetails.role === 'Section Leader';
      setCanDeleteMembers(isGSL || isSectionLeader);
    }
  }, [leaderDetails, user]);

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

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditMember(prev => ({
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
        notes: '',
        phone: '',
        email: ''
      });
      setShowAddForm(false);
      setActiveTab('list'); // Switch back to list after adding
      loadMembers();
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  // Handle tab changes
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'add') {
      setShowAddForm(true);
    } else {
      setShowAddForm(false);
    }
  };

  const handleEditMember = (member) => {
    setEditMember({...member});
    setShowEditForm(true);
  };

  const handleUpdateMember = async (e) => {
    e.preventDefault();
    try {
      await updateMember(editMember.id, editMember);
      setShowEditForm(false);
      setEditMember(null);
      loadMembers();
      // If the current view member is the one being edited, update the view as well
      if (viewMember && viewMember.id === editMember.id) {
        setViewMember(editMember);
      }
    } catch (error) {
      console.error('Error updating member:', error);
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

  const exportToExcel = () => {
    // Prepare data for export
    const exportData = members.map(member => ({
      'First Name': member.firstName,
      'Last Name': member.lastName,
      'Section': member.section,
      'Date of Birth': member.dateOfBirth ? 
        (member.dateOfBirth.toDate ? 
          member.dateOfBirth.toDate().toLocaleDateString() : 
          new Date(member.dateOfBirth).toLocaleDateString()) : 'N/A',
      'Join Date': member.joinDate ? 
        (member.joinDate.toDate ? 
          member.joinDate.toDate().toLocaleDateString() : 
          new Date(member.joinDate).toLocaleDateString()) : 'N/A',
      'Phone': member.phone || 'N/A',
      'Email': member.email || 'N/A',
      'Notes': member.notes || ''
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Members");

    // Generate Excel file
    const excelFileName = `scouts_members_${new Date().toISOString().slice(0,10)}.xlsx`;
    XLSX.writeFile(workbook, excelFileName);
  };

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="members-container">
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
        onTabChange={handleTabChange}
        className="members-tabs"
      />

      <div className="main-content">
        {activeTab === 'list' && (
          <>
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
            <button className="export-button" onClick={exportToExcel}>Export to Excel</button>
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
                          <button onClick={() => handleEditMember(member)}>Edit</button>
                          {canDeleteMembers && (
                            <button onClick={() => handleDeleteMember(member.id)}>Delete</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {activeTab === 'add' && (
          <div className="add-member-content">
            <div className="add-member-form-container">
              <h2>Add New Member</h2>
              <form onSubmit={handleAddMember} className="add-member-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={newMember.firstName} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={newMember.lastName} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="form-row">
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
                    <div className="dob-row">
                      <input type="date" name="dateOfBirth" value={newMember.dateOfBirth} onChange={handleInputChange} />
                      {newMember.dateOfBirth && (
                        <span className="age-display">Age: {calculateAge(newMember.dateOfBirth)} years</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={newMember.phone || ''} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" value={newMember.email || ''} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea name="notes" value={newMember.notes} onChange={handleInputChange} rows="3"></textarea>
                </div>
                <div className="form-actions">
                  <button type="submit" className="submit-btn">Add Member</button>
                  <button type="button" onClick={() => setActiveTab('list')} className="cancel-btn">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}


      {showAddForm && activeTab !== 'add' && (
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
                <div className="dob-row">
                  <input type="date" name="dateOfBirth" value={newMember.dateOfBirth} onChange={handleInputChange} />
                  {newMember.dateOfBirth && (
                    <span className="age-display">Age: {calculateAge(newMember.dateOfBirth)} years</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={newMember.phone || ''} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={newMember.email || ''} onChange={handleInputChange} />
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

      {showEditForm && editMember && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEditForm(false)}>&times;</span>
            <h2>Edit Member</h2>
            <form onSubmit={handleUpdateMember}>
              <div className="form-group">
                <label>First Name</label>
                <input type="text" name="firstName" value={editMember.firstName} onChange={handleEditInputChange} required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" name="lastName" value={editMember.lastName} onChange={handleEditInputChange} required />
              </div>
              <div className="form-group">
                <label>Section</label>
                <select name="section" value={editMember.section} onChange={handleEditInputChange}>
                  <option value="Beavers">Beavers</option>
                  <option value="Cubs">Cubs</option>
                  <option value="Scouts">Scouts</option>
                  <option value="Explorers">Explorers</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <div className="dob-row">
                  <input 
                    type="date" 
                    name="dateOfBirth" 
                    value={editMember.dateOfBirth ? 
                      (editMember.dateOfBirth.toDate ? 
                        editMember.dateOfBirth.toDate().toISOString().split('T')[0] : 
                        new Date(editMember.dateOfBirth).toISOString().split('T')[0]) : ''
                    } 
                    onChange={handleEditInputChange} 
                  />
                  {editMember.dateOfBirth && (
                    <span className="age-display">Age: {calculateAge(editMember.dateOfBirth)} years</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={editMember.phone || ''} onChange={handleEditInputChange} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={editMember.email || ''} onChange={handleEditInputChange} />
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea name="notes" value={editMember.notes || ''} onChange={handleEditInputChange}></textarea>
              </div>
              <button type="submit">Update Member</button>
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
                    {viewMember.dateOfBirth && 
                      <span className="age-display"> (Age: {calculateAge(viewMember.dateOfBirth)} years)</span>}
                  </div>
                  
                  <div className="info-item">
                    <strong>Join Date:</strong> 
                    {viewMember.joinDate 
                      ? (viewMember.joinDate?.toDate 
                        ? viewMember.joinDate.toDate().toLocaleDateString() 
                        : new Date(viewMember.joinDate).toLocaleDateString())
                      : 'Not recorded'}
                  </div>
                  
                  <div className="info-item">
                    <strong>Phone Number:</strong> 
                    {viewMember.phone || 'Not provided'}
                  </div>
                  
                  <div className="info-item">
                    <strong>Email:</strong> 
                    {viewMember.email || 'Not provided'}
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

      
      {showUserModal && (
        <UserDetailsModal
          user={user}
          leaderDetails={leaderDetails}
          onClose={() => setShowUserModal(false)}
        />
      )}
      </div>
    </div>
  );
}
