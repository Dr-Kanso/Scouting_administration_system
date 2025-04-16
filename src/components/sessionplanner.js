import React, { useState, useEffect } from 'react';
import './sessionplanner.css';
import { db, auth } from '../utils/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import beaverBadges from '../data/beaverBadges';
import cubBadges from '../data/cubBadges'; // Import Cub badges
import scoutBadges from '../data/scoutBadges'; // Import Scout badges
import activities from '../data/activities'; // Import activities

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
    activities: '',
    selectedActivities: '',
    equipment: '',
    conclusion: '',
    www: '',
    ebi: '',
  });
  const [availableBadges, setAvailableBadges] = useState([]);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [checkedSteps, setCheckedSteps] = useState({});
  const [availableActivities, setAvailableActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);

  // Update available badges when group changes
  useEffect(() => {
    if (form.group === 'Beavers') {
      setAvailableBadges(beaverBadges);
    } else if (form.group === 'Cubs') { // Add condition for Cubs
      setAvailableBadges(cubBadges);
    } else if (form.group === 'Scouts') { // Add condition for Scouts
      setAvailableBadges(scoutBadges);
    } else {
      // For other groups, clear available badges for now
      setAvailableBadges([]);
    }
    // Reset selected badges when group changes
    setSelectedBadges([]);
    setForm(prevForm => ({ ...prevForm, badges: '' })); // Use functional update for safety
  }, [form.group]);

  // Filter activities by group and selected badges
  useEffect(() => {
    let filteredActivities = [];
    
    if (form.group) {
      // First filter by group
      filteredActivities = activities.filter(activity => 
        activity.suitable.includes(form.group)
      );
      
      // If badges are selected, further filter by those badges
      if (selectedBadges.length > 0) {
        filteredActivities = filteredActivities.filter(activity => {
          // Check if activity contributes to any selected badge
          return activity.badges.some(badge => 
            badge.section === form.group && 
            selectedBadges.some(selectedBadge => selectedBadge.name === badge.name)
          );
        });
      }
    } else {
      filteredActivities = activities;
    }
    
    setAvailableActivities(filteredActivities);
  }, [form.group, selectedBadges]);

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

  const handleActivitySelect = (activity) => {
    let updatedSelection;
    if (selectedActivities.some(a => a.id === activity.id)) {
      updatedSelection = selectedActivities.filter(a => a.id !== activity.id);
    } else {
      updatedSelection = [...selectedActivities, activity];
    }
    setSelectedActivities(updatedSelection);
    setForm({
      ...form,
      selectedActivities: updatedSelection.map(a => a.name).join(', ')
    });
    
    // Optionally auto-populate activities field with selected activities
    const activitiesText = updatedSelection.map(a => 
      `${a.name} (${a.duration}): ${a.description}`
    ).join('\n\n');
    
    setForm(prevForm => ({
      ...prevForm,
      activities: activitiesText
    }));
  };

  // Track checked steps
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
    setSelectedActivities([]);
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
        createdAt: serverTimestamp(),
        createdBy: user.uid
      });

      alert('Session saved successfully!');
      handleReset(); // Optional: clear form after save
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
        <label>Session Title:</label>
        <input name="title" value={form.title} onChange={handleChange} />
      </div>

      <div className="form-row">
        <label>Badge(s) Covered:</label>
        <input name="badges" value={form.badges} onChange={handleChange} placeholder="Type or select below" />

        {availableBadges.length > 0 && (
          <div className="badge-selector">
            <h4>Select from available {form.group} badges:</h4> {/* Dynamic title */}
            <div className="badge-grid">
              {availableBadges.map(badge => (
                <div
                  key={badge.name}
                  className={`badge-item ${selectedBadges.some(b => b.name === badge.name) ? 'selected' : ''}`}
                  onClick={() => handleBadgeSelect(badge)}
                  title={badge.name} // Add title for hover effect
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
                {badge.name} <img
                  src={badge.image}
                  alt={badge.name}
                  style={{ width: '32px', height: 'auto' }} />
              </h4>
              {badge.steps && badge.steps.map(step => (
                <label key={step} className="checklist-label"> {/* Add className here */}
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
        <label>Activities:</label>
        <textarea name="activities" value={form.activities} onChange={handleChange} />

        {form.group && selectedBadges.length > 0 && availableActivities.length > 0 && (
          <div className="activity-selector">
            <h4>
              {selectedBadges.length > 0 
                ? `Activities for ${selectedBadges.map(b => b.name).join(', ')}:`
                : 'Select from Scout activities:'}
            </h4>
            <div className="activity-grid">
              {availableActivities.map(activity => (
                <div 
                  key={activity.id}
                  className={`activity-item ${selectedActivities.some(a => a.id === activity.id) ? 'selected' : ''}`}
                  onClick={() => handleActivitySelect(activity)}
                >
                  <div className="activity-content">
                    <span className="activity-name">{activity.name}</span>
                    <span className="activity-type">{activity.type}</span>
                    <span className="activity-duration">{activity.duration}</span>
                    <p className="activity-description">{activity.description}</p>
                    <div className="activity-badges">
                      {activity.badges
                        .filter(badge => badge.section === form.group)
                        .map(badge => (
                          <span 
                            key={badge.name} 
                            className="activity-badge-tag"
                            title={`Counts towards ${badge.name}`}
                          >
                            {badge.name}
                          </span>
                        ))
                      }
                    </div>
                    <a 
                      href={activity.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {form.group && selectedBadges.length > 0 && availableActivities.length === 0 && (
          <div className="activity-selector">
            <p className="no-activities-message">
              No activities found for the selected badges. Try selecting different badges.
            </p>
          </div>
        )}
        
        {(!form.group || selectedBadges.length === 0) && (
          <div className="activity-selector-info">
            <p>Please select a group and at least one badge to view relevant activities.</p>
          </div>
        )}
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
