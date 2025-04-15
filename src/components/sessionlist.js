import React, { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import './sessionlist.css';

export default function SessionList() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const q = query(collection(db, 'sessions'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSessions(data);
      } catch (error) {
        console.error('Error loading sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="session-list">
      <h1>📋 Submitted Sessions</h1>
      {sessions.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        <ul>
          {sessions.map(session => (
            <li key={session.id}>
              <h2>
                <a href={`/session/${session.id}`}>{session.title || 'Untitled Session'}</a>
              </h2>
              <p><strong>Leader:</strong> {session.leader}</p>
              <p>
                <strong>Group:</strong> {session.group} | <strong>Date:</strong> {session.date || 'No date'}
              </p>
              <p><strong>Badges:</strong> {session.badges || '—'}</p>
              <p><strong>Objectives:</strong> {session.objectives}</p>
              <p><strong>Introductory Points:</strong> {session.intro}</p>
              <p><strong>Islamic Principles:</strong> {session.islamic}</p>
              <p><strong>Main Body:</strong> {session.body}</p>
              <p><strong>Activities Overview:</strong> {session.activities}</p>
              <p><strong>Equipment Needed:</strong> {session.equipment}</p>
              <p><strong>Conclusion:</strong> {session.conclusion}</p>
              <p><strong>WWW:</strong> {session.www}</p>
              <p><strong>EBI:</strong> {session.ebi}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
