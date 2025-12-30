import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import './login.css';
import logo from '../../assets/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setResetSent(false);
    
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSent(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="Hidaya Scouts Logo" className="login-logo" />
          <h1>Hidaya Scouts</h1>
          <p>Leader Portal</p>
        </div>
        
        {error && <div className="login-error">{error}</div>}
        {resetSent && <div className="reset-success">Password reset email sent! Check your inbox.</div>}
        
        {showResetForm ? (
          <form onSubmit={handleResetPassword} className="login-form">
            <h2>Reset Password</h2>
            <p>Enter your email to receive a password reset link</p>
            
            <div className="form-group">
              <label htmlFor="resetEmail">Email</label>
              <input 
                type="email" 
                id="resetEmail"
                value={resetEmail} 
                onChange={(e) => setResetEmail(e.target.value)} 
                placeholder="Enter your email" 
                required 
              />
            </div>
            
            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            
            <div className="form-footer">
              <button 
                type="button" 
                className="back-to-login"
                onClick={() => setShowResetForm(false)}
              >
                Back to Login
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password" 
                required 
              />
            </div>
            
            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            
            <div className="form-footer">
              <button 
                type="button" 
                className="forgot-password"
                onClick={() => {
                  setShowResetForm(true);
                  setResetEmail(email);
                  setError('');
                  setResetSent(false);
                }}
              >
                Forgot Password?
              </button>
            </div>
          </form>
        )}
        
        <div className="login-footer">
          <p>If you need access, please contact your Group Scout Leader.</p>
        </div>
      </div>
    </div>
  );
}
