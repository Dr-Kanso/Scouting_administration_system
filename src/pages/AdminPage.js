import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../utils/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import NavigationHeader from '../components/dashboard/NavigationHeader';
import UserDetailsModal from '../components/dashboard/UserDetailsModal';
import { useAuth } from '../hooks/useAuth';
import './AdminPage.css';

export default function AdminPage() {
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
  
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingLeader, setEditingLeader] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [leaderToDelete, setLeaderToDelete] = useState(null);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    section: 'Beavers',
    role: '',
    phone: ''
  });
  
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
    // Check if user is GSL
    const checkGSL = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      if (!leaderDetails || leaderDetails.role !== 'GSL' || user.email !== 'drhassankanso@gmail.com') {
        navigate('/dashboard');
        return;
      }

      fetchLeaders();
    };

    if (!authLoading) {
      checkGSL();
    }
  }, [user, leaderDetails, authLoading, navigate]);

  const fetchLeaders = async () => {
    setLoading(true);
    try {
      const leadersRef = collection(db, 'leaders');
      const snapshot = await getDocs(leadersRef);
      
      const leadersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setLeaders(leadersData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch leaders');
      console.error('Error fetching leaders:', err);
      setLoading(false);
    }
  };

  const handleEdit = (leader) => {
    setEditingLeader(leader);
    setEditForm({
      firstName: leader.firstName || '',
      lastName: leader.lastName || '',
      email: leader.email || '',
      section: leader.section || 'Beavers',
      role: leader.role || '',
      phone: leader.phone || ''
    });
    setShowEditModal(true);
  };

  const handleDelete = (leader) => {
    setLeaderToDelete(leader);
    setShowDeleteModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const leaderDocRef = doc(db, 'leaders', editingLeader.id);
      await updateDoc(leaderDocRef, {
        ...editForm,
        lastUpdated: new Date()
      });

      // Update role information in the roles collection
      const roleDocRef = doc(db, 'roles', editingLeader.id);
      await updateDoc(roleDocRef, {
        role: editForm.role,
        section: editForm.section,
        updatedAt: new Date(),
        updatedBy: user.uid
      });
      
      setShowEditModal(false);
      setEditingLeader(null);
      fetchLeaders();
    } catch (err) {
      setError('Failed to update leader');
      console.error('Error updating leader:', err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const leaderDocRef = doc(db, 'leaders', leaderToDelete.id);
      await deleteDoc(leaderDocRef);
      
      // Also delete from roles collection
      const roleDocRef = doc(db, 'roles', leaderToDelete.id);
      await deleteDoc(roleDocRef);
      
      setShowDeleteModal(false);
      setLeaderToDelete(null);
      fetchLeaders();
    } catch (err) {
      setError('Failed to delete leader');
      console.error('Error deleting leader:', err);
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
      const leaderRef = doc(db, 'leaders', user.uid);
      await updateDoc(leaderRef, {
        firstName: userDetailsForm.firstName,
        lastName: userDetailsForm.lastName,
        section: userDetailsForm.section,
        role: userDetailsForm.role,
        phone: userDetailsForm.phone
      });

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
    <div className="admin-page">
      <NavigationHeader
        user={user}
        leaderDetails={leaderDetails}
        setShowUserModal={setShowUserModal}
        handleLogout={handleLogout}
        canManageSessions={canManageSessions}
        canManageMeetings={canManageMeetings}
      />
      
      <div className="admin-header">
        <h1>Admin Dashboard - GSL Only</h1>
      </div>

      <div className="admin-container">
        <h2>Manage Leaders</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        {loading || authLoading ? (
          <div className="loading">Loading leaders...</div>
        ) : (
          <div className="leaders-table-container">
            <table className="leaders-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Section</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map(leader => (
                  <tr key={leader.id}>
                    <td>{leader.firstName} {leader.lastName}</td>
                    <td>{leader.email}</td>
                    <td>{leader.section || 'Not assigned'}</td>
                    <td>{leader.role || 'Not assigned'}</td>
                    <td>
                      <button 
                        className="edit-button" 
                        onClick={() => handleEdit(leader)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-button" 
                        onClick={() => handleDelete(leader)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Edit Leader Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="admin-modal">
            <div className="modal-header">
              <h2>Edit Leader</h2>
              <button className="close-button" onClick={() => {
                setShowEditModal(false);
                setEditingLeader(null);
              }}>×</button>
            </div>
            
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  value={editForm.firstName} 
                  onChange={handleEditFormChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  value={editForm.lastName} 
                  onChange={handleEditFormChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={editForm.email} 
                  onChange={handleEditFormChange}
                  readOnly
                />
                <small>Email cannot be changed</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="section">Section</label>
                <select 
                  id="section" 
                  name="section" 
                  value={editForm.section} 
                  onChange={handleEditFormChange}
                >
                  <option value="Beavers">Beavers</option>
                  <option value="Cubs">Cubs</option>
                  <option value="Scouts">Scouts</option>
                  <option value="Explorers">Explorers</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select 
                  id="role" 
                  name="role" 
                  value={editForm.role} 
                  onChange={handleEditFormChange}
                >
                  <option value="">Select a role...</option>
                  {editingLeader?.email === 'drhassankanso@gmail.com' && (
                    <option value="GSL">GSL</option>
                  )}
                  <option value="Group Leader (Male)">Group Leader (Male)</option>
                  <option value="Group Leader (Female)">Group Leader (Female)</option>
                  <option value="Leader">Section Leader</option>
                  <option value="Assistant Leader">Assistant Leader</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={editForm.phone} 
                  onChange={handleEditFormChange}
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" onClick={() => {
                  setShowEditModal(false);
                  setEditingLeader(null);
                }}>Cancel</button>
                <button type="submit" className="primary-button">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && leaderToDelete && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button className="close-button" onClick={() => {
                setShowDeleteModal(false);
                setLeaderToDelete(null);
              }}>×</button>
            </div>
            
            <div className="confirm-content">
              <p>Are you sure you want to delete this leader?</p>
              <p><strong>{leaderToDelete.firstName} {leaderToDelete.lastName}</strong></p>
              <p>This action cannot be undone.</p>
            </div>
            
            <div className="modal-actions">
              <button onClick={() => {
                setShowDeleteModal(false);
                setLeaderToDelete(null);
              }}>Cancel</button>
              <button className="delete-button" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
      
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
