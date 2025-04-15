import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import Login from './components/auth/login';
import Dashboard from './components/dashboard';
import { auth } from './utils/firebase'; // Import auth
import { useAuthState } from 'react-firebase-hooks/auth'; // Import useAuthState


function App() {
  // Get user and loading state
  const [user, loading] = useAuthState(auth);

  // Show loading indicator while checking auth state
  if (loading) {
    // You might want a more styled loading component here
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* If not logged in (user is null), show Login. If logged in, redirect to Dashboard */}
        <Route path="/" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />

        {/* If logged in (user exists), show Dashboard. If not logged in, redirect to Login */}
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" replace />} />

        {/* Add other protected routes here similarly */}
        {/* e.g., <Route path="/planner" element={user ? <Planner /> : <Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;