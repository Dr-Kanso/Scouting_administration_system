import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';
import LoadingSpinner from '../common/LoadingSpinner';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <LoadingSpinner size="large" message="Checking authentication..." />;
  }

  if (requireAuth && !user) {
    return <Navigate to="/" replace />;
  }

  if (!requireAuth && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;