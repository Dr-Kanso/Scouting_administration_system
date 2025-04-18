import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/login';
import Dashboard from './components/dashboard';
import Badges from './components/badges';
import Members from './components/members';
import { auth } from './utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import SessionPlanner from './components/sessionplanner';
import SessionList from './components/sessionlist';
import SessionDetail from './components/sessiondetail';
import AdminPage from './pages/AdminPage';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" replace />} />
        <Route path="/badges" element={<Badges />} />
        <Route path="/members" element={<Members />} />
        <Route path="/planner" element={<SessionPlanner />} />
        <Route path="/sessions" element={<SessionList />} />
        <Route path="/session/:id" element={<SessionDetail />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;