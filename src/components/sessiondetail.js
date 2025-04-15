import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../utils/firebase';
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { generateWordDoc } from '../utils/exporttoword'; // We'll make this in Step 3
import './sessiondetail.css';

export default function SessionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const docRef = doc(db, 'sessions', id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setForm({ id: snapshot.id, ...snapshot.data() });
        } else {
          alert('Session not found.');
          navigate('/sessions');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading session:', error);
      }
    };
    fetchSession();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, 'sessions', id);
      await updateDoc(docRef, {
        ...form,
        updatedAt: serverTimestamp()
      });
      alert('Session updated!');
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update session.');
    }
  };

  const handleExport = () => {
    generateWordDoc(form);
  };

  if (loading || !form) return <p>Loading session...</p>;

  return (
    <div className="session-detail">
      <h2>Edit Session</h2>
      {Object.entries(form).map(([key, value]) => (
        key !== 'createdAt' && key !== 'createdBy' && key !== 'id' ? (
          <div key={key} className="form-group">
            <label>{key}</label>
            <textarea
              name={key}
              value={value}
              onChange={handleChange}
            />
          </div>
        ) : null
      ))}
      <div className="session-buttons">
        <button onClick={handleUpdate}>💾 Update</button>
        <button onClick={handleExport}>📄 Export to Word</button>
      </div>
    </div>
  );
}
