import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import logo from '../assets/logo.png';
import { auth } from '../utils/firebase';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <div className="dashboard">
      <div className="header">
        <img src={logo} alt="14th Willesden Logo" className="logo" />
        <h1>Welcome to 14th Willesden Scouts</h1>
        <p>{user?.email}</p>
      </div>

      <div className="card-grid">
        <div className="card" onClick={() => navigate('/planner')}>
          🧭 Session Planner
        </div>
        <div className="card" onClick={() => navigate('/badges')}>
          🏅 Badge Tracker
        </div>
        <div className="card" onClick={() => navigate('/resources')}>
          📂 Resource Library
        </div>
        <div className="card" onClick={() => navigate('/calendar')}>
          🗓️ Upcoming Sessions
        </div>
      </div>

      <button className="logout" onClick={handleLogout}>Logout</button>
    </div>
  );
}
