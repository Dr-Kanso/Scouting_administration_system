import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo
import './sessionplanner.css';
import { db, auth } from '../utils/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import beaverBadges from '../data/beaverBadges';
import cubBadges from '../data/cubBadges'; // Import Cub badges
import scoutBadges from '../data/scoutBadges'; // Import Scout badges
import rawActivities from '../data/activities'; // Import raw activities data

export default function SessionPlanner() {
  const [form, setForm] = useState({
    leader: '',
    group: '',
    date: '',
    title: '',
    badges: '',
    intro: '',
    islamic: '',
    body: '',
    equipment: '',
    conclusion: '',
    www: '',
    ebi: '',
  });
  const [availableBadges, setAvailableBadges] = useState([]);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [checkedSteps, setCheckedSteps] = useState({});

  // Transform raw activity data into the format needed by the component
  const transformedActivities = useMemo(() => {
    return rawActivities.map((activity, index) => {
      const badges = [];
      if (activity.countsTowards) {
        Object.entries(activity.countsTowards).forEach(([section, badgeNames]) => {
          badgeNames.forEach(name => {
            badges.push({ section, name });
          });
        });
      }
      return {
        id: `${activity.title.replace(/\s+/g, '-')}-${index}`, // Generate a simple ID
        name: activity.title,
        url: activity.url,
        duration: activity.details?.time || 'N/A',
        cost: activity.details?.cost || 'N/A',
        location: activity.details?.location || 'N/A',
        groupSize: activity.details?.groupSize || 'N/A',
        suitable: activity.details?.suitableFor || [],
        description: `Activity details available at: ${activity.url}`, // Placeholder description
        badges: badges,
        type: 'General', // Add a placeholder type if needed, or derive it
      };
    });
  }, []); // Empty dependency array means this runs once

  // Update available badges when group changes
  useEffect(() => {
    if (form.group === 'Beavers') {
      setAvailableBadges(beaverBadges);
    } else if (form.group === 'Cubs') {
      setAvailableBadges(cubBadges);
    } else if (form.group === 'Scouts') {
      setAvailableBadges(scoutBadges);
    } else {
      setAvailableBadges([]);
    }
    setSelectedBadges([]);
    setForm(prevForm => ({ ...prevForm, badges: '' }));
  }, [form.group]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBadgeSelect = (badge) => {
    let updatedSelection;
    if (selectedBadges.some(b => b.name === badge.name)) {
      updatedSelection = selectedBadges.filter(b => b.name !== badge.name);
    } else {
      updatedSelection = [...selectedBadges, badge];
    }
    setSelectedBadges(updatedSelection);
    setForm({
      ...form,
      badges: updatedSelection.map(b => b.name).join(', ')
    });
  };

  const handleStepCheckChange = (badgeName, step) => {
    setCheckedSteps(prev => {
      const badgeChecks = { ...prev[badgeName] };
      badgeChecks[step] = !badgeChecks[step];
      return { ...prev, [badgeName]: badgeChecks };
    });
  };

  const handleReset = () => {
    setForm(Object.fromEntries(Object.keys(form).map(key => [key, ''])));
    setSelectedBadges([]);
    setCheckedSteps({});
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('You must be logged in to save a session.');
        return;
      }

      await addDoc(collection(db, 'sessions'), {
        ...form,
        selectedBadges: selectedBadges,
        checkedSteps: checkedSteps,
        createdAt: serverTimestamp(),
        createdBy: user.uid
      });

      alert('Session saved successfully!');
      handleReset();
    } catch (error) {
      console.error('Error saving session:', error);
      alert('Failed to save session.');
    }
  };

  return (
    <div className="session-planner">
      <h1>🧭 Session Planner</h1>

      <div className="form-row">
        <label>Leader's Name:</label>
        <input name="leader" value={form.leader} onChange={handleChange} />
      </div>

      <div className="form-row">
        <label>Group:</label>
        <select name="group" value={form.group} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Beavers">Beavers</option>
          <option value="Cubs">Cubs</option>
          <option value="Scouts">Scouts</option>
        </select>
      </div>

      <div className="form-row">
        <label>Date:</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} />
      </div>

      <div className="form-row">
        <label>Badge(s) Covered:</label>
        <input name="badges" value={form.badges} onChange={handleChange} placeholder="Type or select below" />

        {availableBadges.length > 0 && (
          <div className="badge-selector">
            <h4>Select from available {form.group} badges:</h4>
            <div className="badge-grid">
              {availableBadges.map(badge => (
                <div
                  key={badge.name}
                  className={`badge-item ${selectedBadges.some(b => b.name === badge.name) ? 'selected' : ''}`}
                  onClick={() => handleBadgeSelect(badge)}
                  title={badge.name}
                >
                  <img src={badge.image} alt={badge.name} />
                  <span>{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedBadges.length > 0 && (
        <div className="form-row">
          <h3>Badge Steps Checklist</h3>
          {selectedBadges.map(badge => (
            <div key={badge.name}>
              <h4>
                {badge.name}
                <img
                  src={badge.image}
                  alt={badge.name}
                  style={{ width: '32px', height: 'auto', verticalAlign: 'middle' }}
                />
                {badge.url && (
                  <a
                    href={badge.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.8em', marginLeft: '10px' }}
                  >
                    (show activities)
                  </a>
                )}
              </h4>
              {badge.steps && badge.steps.map(step => (
                <label key={step} className="checklist-label">
                  <input
                    type="checkbox"
                    checked={checkedSteps[badge.name]?.[step] || false}
                    onChange={() => handleStepCheckChange(badge.name, step)} />
                  {step}
                </label>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="form-row">
        <label>Session Title:</label>
        <input name="title" value={form.title} onChange={handleChange} />
      </div>

      <div className="form-row">
        <label>Introductory Points:</label>
        <textarea name="intro" value={form.intro} onChange={handleChange} />
      </div>

      <div className="form-row">
        <label>Islamic Principles (integrated):</label>
        <textarea name="islamic" value={form.islamic} onChange={handleChange} />
      </div>

      <div className="form-row">
        <label>Main Body:</label>
        <textarea name="body" value={form.body} onChange={handleChange} />
      </div>

      <div className="form-row">
        <label>Equipment Needed (include costs):</label>
        <textarea name="equipment" value={form.equipment} onChange={handleChange} />
      </div>

      <div className="form-row">
        <label>Conclusive Statement:</label>
        <textarea name="conclusion" value={form.conclusion} onChange={handleChange} />
      </div>

      <div className="form-row split">
        <div>
          <label>What Went Well (WWW):</label>
          <textarea name="www" value={form.www} onChange={handleChange} />
        </div>
        <div>
          <label>Even Better If (EBI):</label>
          <textarea name="ebi" value={form.ebi} onChange={handleChange} />
        </div>
      </div>

      <div className="form-buttons">
        <button onClick={handleSave}>💾 Save</button>
        <button onClick={() => alert('Export coming next')}>⬇️ Export as Word</button>
        <button onClick={handleReset}>🔁 Reset</button>
      </div>
    </div>
  );
}
