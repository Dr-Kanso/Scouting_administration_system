import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './sessionplanner.css';
import { db, auth } from '../utils/firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import beaverBadges from '../data/beaverBadges';
import cubBadges from '../data/cubBadges';
import scoutBadges from '../data/scoutBadges';
import rawActivities from '../data/activities';

export default function SessionPlanner() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    leader: '',
    group: '',
    sessionDate: '',
    title: '',
    badges: '',
    intro: '',
    islamic: '',
    body: '',
    equipment: '',
    conclusion: '',
    www: '',
    ebi: '',
    sessionTime: '15:30',
  });
  const [availableBadges, setAvailableBadges] = useState([]);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [checkedSteps, setCheckedSteps] = useState({});

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
        id: `${activity.title.replace(/\s+/g, '-')}-${index}`,
        name: activity.title,
        url: activity.url,
        duration: activity.details?.time || 'N/A',
        cost: activity.details?.cost || 'N/A',
        location: activity.details?.location || 'N/A',
        groupSize: activity.details?.groupSize || 'N/A',
        suitable: activity.details?.suitableFor || [],
        description: `Activity details available at: ${activity.url}`,
        badges: badges,
        type: 'General',
      };
    });
  }, []);

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

  useEffect(() => {
    const fetchLeaderDetails = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const leaderDocRef = doc(db, 'leaders', user.uid);
          const leaderDoc = await getDoc(leaderDocRef);
          
          if (leaderDoc.exists()) {
            const leaderData = leaderDoc.data();
            const leaderName = `${leaderData.firstName || ''} ${leaderData.lastName || ''}`.trim();
            setForm(prevForm => ({
              ...prevForm,
              leader: leaderName,
              group: leaderData.section || prevForm.group
            }));
          }
        }
      } catch (err) {
        console.error("Error fetching leader details:", err);
      }
    };

    fetchLeaderDetails();
  }, []);

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
    setForm({
      leader: '',
      group: '',
      sessionDate: '',
      sessionTime: '15:30',
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

      // Validate required fields for calendar display
      if (!form.title || !form.sessionDate || !form.group) {
        alert('Please fill in at least the Title, Session Date, and Group fields before saving.');
        return;
      }

      // Creation date (when the session plan is added to the system)
      const creationDate = new Date();
      
      // Session date (when the session will actually take place - for the calendar)
      const sessionDate = new Date(form.sessionDate);
      const [hours, minutes] = form.sessionTime.split(':');
      sessionDate.setHours(parseInt(hours), parseInt(minutes), 0);

      // Extract time information if available, or use default time
      let timeString = "15:30";
      if (form.sessionTime) {
        timeString = form.sessionTime;
      }

      // Create data object in format compatible with dashboard calendar
      const sessionData = {
        // Calendar required fields
        title: form.title,
        date: sessionDate, // This is the execution date that appears on the calendar
        section: form.group,
        location: form.location || "Scout HQ",
        description: form.body || form.intro || "Session planned via Session Planner",
        
        // Tracking dates
        createdAt: serverTimestamp(), // When the session plan was created
        plannedFor: sessionDate, // When the session will be executed
        
        // User tracking
        createdBy: user.uid,
        
        // Additional session planner fields
        leader: form.leader,
        badges: form.badges,
        selectedBadges: selectedBadges,
        checkedSteps: checkedSteps,
        intro: form.intro,
        islamic: form.islamic,
        equipment: form.equipment,
        conclusion: form.conclusion,
        www: form.www,
        ebi: form.ebi,
        
        // Flag to identify as a session plan
        isSessionPlan: true
      };

      // Save to Firestore sessions collection
      await addDoc(collection(db, 'sessions'), sessionData);

      alert('Session plan saved successfully! The session will appear on the calendar for ' + 
            sessionDate.toLocaleDateString() + ' at ' + form.sessionTime + '.');
      handleReset();
    } catch (error) {
      console.error('Error saving session:', error);
      alert('Failed to save session.');
    }
  };

  const handleExportWord = async () => {
    try {
      if (!form.leader || !form.group || !form.title) {
        alert('Please fill in at least the Leader Name, Group, and Session Title before exporting.');
        return;
      }
      
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: "14th Willesden Scout Group",
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "Session Plan",
                heading: HeadingLevel.HEADING_2,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "",
              }),
              
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 30, type: WidthType.PERCENTAGE },
                        children: [new Paragraph("Leader:")],
                      }),
                      new TableCell({
                        width: { size: 70, type: WidthType.PERCENTAGE },
                        children: [new Paragraph(form.leader || "")],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph("Group:")],
                      }),
                      new TableCell({
                        children: [new Paragraph(form.group || "")],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph("Session Date:")],
                      }),
                      new TableCell({
                        children: [new Paragraph(form.sessionDate || "")],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph("Session Time:")],
                      }),
                      new TableCell({
                        children: [new Paragraph(form.sessionTime || "")],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph("Session Title:")],
                      }),
                      new TableCell({
                        children: [new Paragraph(form.title || "")],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph("Badges Covered:")],
                      }),
                      new TableCell({
                        children: [new Paragraph(form.badges || "None")],
                      }),
                    ],
                  }),
                ],
              }),
              
              new Paragraph({
                text: "",
              }),
              
              ...(selectedBadges.length > 0 ? [
                new Paragraph({
                  text: "Badge Requirements",
                  heading: HeadingLevel.HEADING_3,
                }),
                ...selectedBadges.flatMap(badge => [
                  new Paragraph({
                    text: badge.name,
                    heading: HeadingLevel.HEADING_4,
                  }),
                  ...(badge.steps ? badge.steps.map(step => 
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "□ ",
                          bold: true,
                        }),
                        new TextRun(step),
                      ],
                    })
                  ) : []),
                  new Paragraph({ text: "" }),
                ]),
              ] : []),
              
              new Paragraph({
                text: "Session Content",
                heading: HeadingLevel.HEADING_3,
              }),
              
              new Paragraph({
                text: "Introductory Points",
                heading: HeadingLevel.HEADING_4,
              }),
              new Paragraph(form.intro || ""),
              
              new Paragraph({
                text: "Islamic Principles (integrated)",
                heading: HeadingLevel.HEADING_4,
              }),
              new Paragraph(form.islamic || ""),
              
              new Paragraph({
                text: "Main Body",
                heading: HeadingLevel.HEADING_4,
              }),
              new Paragraph(form.body || ""),
              
              new Paragraph({
                text: "Equipment Needed",
                heading: HeadingLevel.HEADING_4,
              }),
              new Paragraph(form.equipment || ""),
              
              new Paragraph({
                text: "Conclusive Statement",
                heading: HeadingLevel.HEADING_4,
              }),
              new Paragraph(form.conclusion || ""),
              
              new Paragraph({
                text: "Reflection",
                heading: HeadingLevel.HEADING_3,
              }),
              
              new Paragraph({
                text: "What Went Well (WWW)",
                heading: HeadingLevel.HEADING_4,
              }),
              new Paragraph(form.www || ""),
              
              new Paragraph({
                text: "Even Better If (EBI)",
                heading: HeadingLevel.HEADING_4,
              }),
              new Paragraph(form.ebi || ""),
            ],
          },
        ],
      });
      
      const buffer = await Packer.toBlob(doc);
      const fileName = `${form.title || 'Session Plan'}_${form.group || ''}_${form.sessionDate || ''}.docx`.replace(/\s+/g, '_');
      saveAs(buffer, fileName);
      
    } catch (error) {
      console.error('Error exporting session to Word:', error);
      alert('Failed to export session. Please try again.');
    }
  };

  return (
    <div className="session-planner">
      <div className="planner-header">
        <h1>🧭 Session Planner</h1>
        <p>Create and manage your Scout sessions with this interactive planner</p>
        <button 
          className="back-to-dashboard" 
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="planner-card">
        <h2>📋 Session Details</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Leader's Name:</label>
            <input 
              name="leader" 
              value={form.leader} 
              onChange={handleChange}
              placeholder="Enter your name" 
              readOnly
              className="readonly-input"
            />
          </div>

          <div className="form-group">
            <label>Group:</label>
            <select 
              name="group" 
              value={form.group} 
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select a group</option>
              <option value="Beavers">Beavers</option>
              <option value="Cubs">Cubs</option>
              <option value="Scouts">Scouts</option>
            </select>
          </div>

          <div className="form-group">
            <label>Session Date:</label>
            <input 
              type="date" 
              name="sessionDate" 
              value={form.sessionDate} 
              onChange={handleChange} 
              className="date-input"
            />
          </div>

          <div className="form-group">
            <label>Session Time:</label>
            <input 
              type="time" 
              name="sessionTime" 
              value={form.sessionTime} 
              onChange={handleChange} 
              className="time-input"
            />
          </div>
        </div>
      </div>

      <div className="planner-card">
        <h2>🏅 Badge Selection</h2>
        <div className="form-group full-width">
          <label>Badge(s) Covered:</label>
          <input 
            name="badges" 
            value={form.badges} 
            onChange={handleChange} 
            placeholder="Type or select badges below" 
            className="badge-input"
          />

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
          <div className="badge-steps-container">
            <h3>Badge Requirements Checklist</h3>
            {selectedBadges.map(badge => (
              <div key={badge.name} className="badge-steps-card">
                <div className="badge-header">
                  <img
                    src={badge.image}
                    alt={badge.name}
                    className="badge-icon"
                  />
                  <h4>{badge.name}</h4>
                  {badge.url && (
                    <a
                      href={badge.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="badge-link"
                    >
                      View activities
                    </a>
                  )}
                </div>
                <div className="steps-checklist">
                  {badge.steps && badge.steps.map(step => (
                    <label key={step} className="checklist-label">
                      <input
                        type="checkbox"
                        checked={checkedSteps[badge.name]?.[step] || false}
                        onChange={() => handleStepCheckChange(badge.name, step)} 
                      />
                      <span>{step}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="planner-card">
        <h2>🎯 Session Content</h2>
        <div className="form-group full-width">
          <label>Session Title:</label>
          <input 
            name="title" 
            value={form.title} 
            onChange={handleChange}
            placeholder="Give your session a name" 
          />
        </div>

        <div className="form-group full-width">
          <label>Introductory Points:</label>
          <textarea 
            name="intro" 
            value={form.intro} 
            onChange={handleChange}
            placeholder="How will you introduce the session?" 
            rows="3"
          />
        </div>

        <div className="form-group full-width">
          <label>Islamic Principles (integrated):</label>
          <textarea 
            name="islamic" 
            value={form.islamic} 
            onChange={handleChange}
            placeholder="Add Islamic principles related to this activity" 
            rows="3"
          />
        </div>

        <div className="form-group full-width">
          <label>Main Body:</label>
          <textarea 
            name="body" 
            value={form.body} 
            onChange={handleChange}
            placeholder="Describe the main activities and instructions"
            rows="6" 
          />
        </div>

        <div className="form-group full-width">
          <label>Equipment Needed:</label>
          <textarea 
            name="equipment" 
            value={form.equipment} 
            onChange={handleChange}
            placeholder="List all equipment and materials (include costs if applicable)"
            rows="3" 
          />
        </div>

        <div className="form-group full-width">
          <label>Conclusive Statement:</label>
          <textarea 
            name="conclusion" 
            value={form.conclusion} 
            onChange={handleChange}
            placeholder="How will you wrap up the session?"
            rows="3"
          />
        </div>
      </div>

      <div className="planner-card">
        <h2>🔍 Reflection</h2>
        <div className="reflection-grid">
          <div className="form-group">
            <label>What Went Well (WWW):</label>
            <textarea 
              name="www" 
              value={form.www} 
              onChange={handleChange}
              placeholder="Reflect on the positive aspects"
              rows="4" 
            />
          </div>
          <div className="form-group">
            <label>Even Better If (EBI):</label>
            <textarea 
              name="ebi" 
              value={form.ebi} 
              onChange={handleChange}
              placeholder="Note areas for improvement"
              rows="4" 
            />
          </div>
        </div>
      </div>

      <div className="form-buttons">
        <button className="btn-save" onClick={handleSave}>
          <span>💾</span> Save Session
        </button>
        <button className="btn-export" onClick={handleExportWord}>
          <span>⬇️</span> Export as Word
        </button>
        <button className="btn-reset" onClick={handleReset}>
          <span>🔁</span> Reset Form
        </button>
      </div>
    </div>
  );
}
