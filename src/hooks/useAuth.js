import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  
  const [leaderDetails, setLeaderDetails] = useState({
    firstName: '',
    lastName: '',
    section: 'Beavers',
    role: '',
    phone: ''
  });
  const [showUserModal, setShowUserModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      if (user) {
        const userDocRef = doc(db, 'leaders', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setLeaderDetails(userDoc.data());
        }
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Role checking
  const hasRole = (roleToCheck) => {
    if (!leaderDetails || !leaderDetails.role) return false;

    if (roleToCheck === 'GSL') {
      return leaderDetails.role === 'GSL' && user?.email === 'drhassankanso@gmail.com';
    }

    return leaderDetails.role === roleToCheck;
  };

  const canManageSessions = hasRole('GSL') || hasRole('Group Leader (Male)') || hasRole('Group Leader (Female)') || hasRole('Leader');
  const canManageMeetings = hasRole('GSL') || hasRole('Group Leader (Male)') || hasRole('Group Leader (Female)');

  useEffect(() => {
    // Check authentication
    if (!user) {
      navigate('/login');
      return;
    }

    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  return {
    user,
    leaderDetails,
    setLeaderDetails,
    showUserModal,
    setShowUserModal,
    loading,
    handleLogout,
    hasRole,
    canManageSessions,
    canManageMeetings,
    fetchUserDetails
  };
};