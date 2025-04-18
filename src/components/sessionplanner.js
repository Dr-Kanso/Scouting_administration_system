import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './sessionplanner.css';
import { db, auth } from '../utils/firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import beaverBadges from '../data/beaverBadges';
import cubBadges from '../data/cubBadges';
import scoutBadges from '../data/scoutBadges';
import rawActivities from '../data/activities';

const parseDate = (dateField) => {
  if (!dateField) return '';
  try {
    const date = dateField.toDate ? dateField.toDate() : new Date(dateField);
    return date.toISOString().split('T')[0];
  } catch (e) {
    console.error("Error parsing date:", e);
    return '';
  }
};

const parseTime = (dateField) => {
  if (!dateField) return '15:30';
  try {
    const date = dateField.toDate ? dateField.toDate() : new Date(dateField);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  } catch (e) {
    console.error("Error parsing time:", e);
    return '15:30';
  }
};

export default function SessionPlanner() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    leader: '',
    group: '',
    sessionDate: '',
    title: '',
    badges: '',
    intro: '',
    islamic: '',
    body: '',
    activityLink: '',
    conclusion: '',
    www: '',
    ebi: '',
    sessionTime: '15:30',
  });
  const [availableBadges, setAvailableBadges] = useState([]);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [checkedSteps, setCheckedSteps] = useState({});
  const [costItems, setCostItems] = useState([{ resource: '', quantity: 1, cost: '' }]);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('create');
  const [sessionId, setSessionId] = useState(null);

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
    const params = new URLSearchParams(location.search);
    const modeParam = params.get('mode');
    const idParam = params.get('sessionId');

    if (idParam && (modeParam === 'edit' || modeParam === 'view')) {
      setMode(modeParam);
      setSessionId(idParam);
      setIsLoading(true);

      const fetchSessionData = async () => {
        try {
          const sessionDocRef = doc(db, 'sessions', idParam);
          const sessionDoc = await getDoc(sessionDocRef);

          if (sessionDoc.exists()) {
            const data = sessionDoc.data();

            setForm({
              leader: data.leader || '',
              group: data.section || data.group || '',
              sessionDate: parseDate(data.date || data.plannedFor),
              sessionTime: parseTime(data.date || data.plannedFor),
              title: data.title || '',
              badges: data.badges || '',
              intro: data.intro || '',
              islamic: data.islamic || '',
              body: data.description || data.body || '',
              activityLink: data.activityLink || '',
              conclusion: data.conclusion || '',
              www: data.www || '',
              ebi: data.ebi || '',
            });

            setSelectedBadges(data.selectedBadges || []);
            setCheckedSteps(data.checkedSteps || {});
            setCostItems(Array.isArray(data.costBreakdown) && data.costBreakdown.length > 0 ? data.costBreakdown : [{ resource: '', quantity: 1, cost: '' }]);
          } else {
            console.error("Session not found!");
            alert("Session not found. Redirecting to dashboard.");
            navigate('/dashboard');
          }
        } catch (error) {
          console.error("Error fetching session data:", error);
          alert("Error loading session data.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchSessionData();
    } else {
      setMode('create');
      setSessionId(null);
      fetchLeaderDetails();
    }
  }, [location.search, navigate]);

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
    if (mode === 'create') {
      setSelectedBadges([]);
      setForm(prevForm => ({ ...prevForm, badges: '' }));
    }
  }, [form.group, mode]);

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
            leader: prevForm.leader || leaderName,
            group: prevForm.group || leaderData.section || ''
          }));
        }
      }
    } catch (err) {
      console.error("Error fetching leader details:", err);
    }
  };

  const handleChange = (e) => {
    if (mode === 'view') return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBadgeSelect = (badge) => {
    if (mode === 'view') return;
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
    if (mode === 'view') return;
    setCheckedSteps(prev => {
      const badgeChecks = { ...prev[badgeName] };
      badgeChecks[step] = !badgeChecks[step];
      return { ...prev, [badgeName]: badgeChecks };
    });
  };

  const handleCostItemChange = (index, field, value) => {
    if (mode === 'view') return;
    const newCostItems = [...costItems];

    if (field === 'quantity') {
      value = Math.max(1, parseInt(value) || 1);
    } else if (field === 'cost') {
      value = value === '' ? '' : parseFloat(value) || 0;
    }

    newCostItems[index][field] = value;
    setCostItems(newCostItems);
  };

  const addCostItem = () => {
    if (mode === 'view') return;
    setCostItems([...costItems, { resource: '', quantity: 1, cost: '' }]);
  };

  const removeCostItem = (index) => {
    if (mode === 'view') return;
    if (costItems.length === 1) {
      setCostItems([{ resource: '', quantity: 1, cost: '' }]);
    } else {
      const newCostItems = [...costItems];
      newCostItems.splice(index, 1);
      setCostItems(newCostItems);
    }
  };

  const calculateItemTotal = (item) => {
    const quantity = parseInt(item.quantity) || 0;
    const cost = parseFloat(item.cost) || 0;
    return quantity * cost;
  };

  const calculateGrandTotal = () => {
    return costItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form? Any unsaved changes will be lost.")) {
      if (mode === 'edit' || mode === 'view') {
        navigate('/planner');
      } else {
        setForm({
          leader: '', group: '', sessionDate: '', sessionTime: '15:30', title: '', badges: '',
          intro: '', islamic: '', body: '', activityLink: '', conclusion: '', www: '', ebi: '',
        });
        setSelectedBadges([]);
        setCheckedSteps({});
        setCostItems([{ resource: '', quantity: 1, cost: '' }]);
        fetchLeaderDetails();
      }
    }
  };

  const handleSave = async () => {
    if (mode === 'view') return;

    try {
      const user = auth.currentUser;
      if (!user) {
        alert('You must be logged in to save a session.');
        return;
      }

      if (!form.title || !form.sessionDate || !form.group) {
        alert('Please fill in at least the Title, Session Date, and Group fields before saving.');
        return;
      }

      const sessionDate = new Date(form.sessionDate);
      const [hours, minutes] = form.sessionTime.split(':');
      sessionDate.setHours(parseInt(hours), parseInt(minutes), 0);

      let timeString = form.sessionTime || "15:30";

      const sessionData = {
        title: form.title,
        date: sessionDate,
        section: form.group,
        description: form.body,
        activityLink: form.activityLink,
        plannedFor: sessionDate,
        leader: form.leader,
        badges: form.badges,
        selectedBadges: selectedBadges,
        checkedSteps: checkedSteps,
        intro: form.intro,
        islamic: form.islamic,
        conclusion: form.conclusion,
        www: form.www,
        ebi: form.ebi,
        costBreakdown: costItems.map(item => ({
          ...item,
          totalCost: calculateItemTotal(item)
        })).filter(item => item.resource || item.cost),
        costTotal: calculateGrandTotal(),
        isSessionPlan: true,
        lastUpdatedAt: serverTimestamp(),
        ...(mode === 'create' && { createdAt: serverTimestamp(), createdBy: user.uid }),
        ...(mode === 'edit' && { updatedBy: user.uid }),
      };

      if (mode === 'edit' && sessionId) {
        const sessionDocRef = doc(db, 'sessions', sessionId);
        await updateDoc(sessionDocRef, sessionData);
        alert('Session plan updated successfully!');
        navigate('/sessions');
      } else {
        await addDoc(collection(db, 'sessions'), sessionData);
        alert('Session plan saved successfully! The session will appear on the calendar for ' + 
              sessionDate.toLocaleDateString() + ' at ' + timeString + '.');
        handleReset();
      }

    } catch (error) {
      console.error(`Error ${mode === 'edit' ? 'updating' : 'saving'} session:`, error);
      alert(`Failed to ${mode === 'edit' ? 'update' : 'save'} session.`);
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
                          text: checkedSteps[badge.name]?.[step] ? "☑ " : "□ ", 
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
                text: "Link to Activity",
                heading: HeadingLevel.HEADING_4,
              }),
              new Paragraph(form.activityLink || "N/A"),

              new Paragraph({
                text: "Equipment and Cost", 
                heading: HeadingLevel.HEADING_4,
              }),
              ...(costItems.some(item => item.resource || item.cost) ? [
                new Table({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  rows: [
                    new TableRow({
                      children: [
                        new TableCell({
                          width: { size: 40, type: WidthType.PERCENTAGE },
                          children: [new Paragraph({ text: "Resource", bold: true })],
                        }),
                        new TableCell({
                          width: { size: 15, type: WidthType.PERCENTAGE },
                          children: [new Paragraph({ text: "Quantity", bold: true })],
                        }),
                        new TableCell({
                          width: { size: 20, type: WidthType.PERCENTAGE },
                          children: [new Paragraph({ text: "Cost Per Item (£)", bold: true })],
                        }),
                        new TableCell({
                          width: { size: 25, type: WidthType.PERCENTAGE },
                          children: [new Paragraph({ text: "Total (£)", bold: true })],
                        }),
                      ],
                    }),
                    ...costItems.filter(item => item.resource || item.cost).map(item => 
                      new TableRow({
                        children: [
                          new TableCell({
                            children: [new Paragraph(item.resource || "")],
                          }),
                          new TableCell({
                            children: [new Paragraph(item.quantity?.toString() || "1")],
                          }),
                          new TableCell({
                            children: [new Paragraph(item.cost?.toString() || "")],
                          }),
                          new TableCell({
                            children: [new Paragraph((calculateItemTotal(item)).toFixed(2))],
                          }),
                        ],
                      })
                    ),
                    new TableRow({
                      children: [
                        new TableCell({
                          columnSpan: 3,
                          children: [new Paragraph({ text: "Grand Total:", bold: true })],
                        }),
                        new TableCell({
                          children: [new Paragraph({ text: `£${calculateGrandTotal().toFixed(2)}`, bold: true })],
                        }),
                      ],
                    }),
                  ],
                }),
              ] : [new Paragraph("No cost items added.")]),
              
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

  const isReadOnly = mode === 'view';

  if (isLoading) {
    return <div className="loading-container">Loading session data...</div>;
  }

  return (
    <div className="session-planner">
      <div className="planner-header">
        <h1>{mode === 'view' ? 'View Session Plan' : mode === 'edit' ? 'Edit Session Plan' : '🧭 Session Planner'}</h1>
        <p>{mode === 'view' ? 'Reviewing session details.' : 'Create and manage your Scout sessions.'}</p>
        <button 
          className="back-to-dashboard" 
          onClick={() => navigate(mode === 'view' || mode === 'edit' ? '/sessions' : '/dashboard')} 
        >
          {mode === 'view' || mode === 'edit' ? '← Back to List' : '← Back to Dashboard'}
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
              disabled={isReadOnly}
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
              readOnly={isReadOnly}
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
              readOnly={isReadOnly}
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
            placeholder={isReadOnly ? "N/A" : "Type or select badges below"}
            className="badge-input"
            readOnly={isReadOnly}
          />

          {(availableBadges.length > 0 && !isReadOnly) || (isReadOnly && selectedBadges.length > 0) ? (
            <div className={`badge-selector ${isReadOnly ? 'view-mode' : ''}`}>
              <h4>{isReadOnly ? "Selected Badges:" : `Select from available ${form.group} badges:`}</h4>
              <div className="badge-grid">
                {(isReadOnly ? selectedBadges : availableBadges).map(badge => (
                  <div
                    key={badge.name}
                    className={`badge-item ${selectedBadges.some(b => b.name === badge.name) ? 'selected' : ''} ${isReadOnly ? 'no-click' : ''}`}
                    onClick={!isReadOnly ? () => handleBadgeSelect(badge) : undefined}
                    title={badge.name}
                  >
                    <img src={badge.image} alt={badge.name} />
                    <span>{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
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
                    <label key={step} className={`checklist-label ${isReadOnly ? 'view-mode' : ''}`}>
                      <input
                        type="checkbox"
                        checked={checkedSteps[badge.name]?.[step] || false}
                        onChange={() => handleStepCheckChange(badge.name, step)} 
                        disabled={isReadOnly}
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
            placeholder={isReadOnly ? "N/A" : "Give your session a name"}
            readOnly={isReadOnly}
          />
        </div>

        <div className="form-group full-width">
          <label>Introductory Points:</label>
          <textarea 
            name="intro" 
            value={form.intro} 
            onChange={handleChange}
            placeholder={isReadOnly ? "N/A" : "How will you introduce the session?"}
            rows="3"
            readOnly={isReadOnly}
          />
        </div>

        <div className="form-group full-width"> 
          <label>Islamic Principles (integrated):</label>
          <textarea 
            name="islamic" 
            value={form.islamic} 
            onChange={handleChange}
            placeholder={isReadOnly ? "N/A" : "Add Islamic principles related to this activity"}
            rows="3"
            readOnly={isReadOnly}
          />
        </div>

        <div className="form-group full-width">
          <label>Main Body:</label>
          <textarea 
            name="body" 
            value={form.body} 
            onChange={handleChange}
            placeholder={isReadOnly ? "N/A" : "Describe the main activities and instructions"}
            rows="6" 
            readOnly={isReadOnly}
          />
        </div>

        <div className="form-group full-width">
          <label>
            Link to Activity: 
            <span className="label-badge-links"> 
              (Link to badges: 
              <a href="https://www.scouts.org.uk/beavers/activity-badges/" target="_blank" rel="noopener noreferrer">Beavers</a>, 
              <a href="https://www.scouts.org.uk/cubs/activity-badges/" target="_blank" rel="noopener noreferrer">Cubs</a>, 
              <a href="https://www.scouts.org.uk/scouts/activity-badges/" target="_blank" rel="noopener noreferrer">Scouts</a>
              )
            </span>
          </label> 
          <input
            type="url" 
            name="activityLink" 
            value={form.activityLink} 
            onChange={handleChange}
            placeholder={isReadOnly ? "N/A" : "https://example.com/activity-details"}
            readOnly={isReadOnly}
          />
        </div>

        <div className="form-group full-width">
          <h3>💲 Equipment and Cost</h3> 
          <div className={`cost-breakdown-table ${isReadOnly ? 'view-mode' : ''}`}> 
            <div className={`cost-header ${isReadOnly ? 'view-mode' : ''}`}> 
              <div>Resource</div>
              <div>Quantity</div>
              <div>Cost Per Item (£)</div>
              <div>Total (£)</div>
              {!isReadOnly && <div></div>} 
            </div>
            {costItems.map((item, index) => (
              <div key={index} className={`cost-row ${isReadOnly ? 'view-mode' : ''}`}> 
                <input
                  type="text"
                  value={item.resource}
                  onChange={(e) => handleCostItemChange(index, 'resource', e.target.value)}
                  placeholder={isReadOnly ? "N/A" : "Item name"}
                  readOnly={isReadOnly}
                />
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleCostItemChange(index, 'quantity', e.target.value)}
                  placeholder="1"
                  min="1"
                  readOnly={isReadOnly}
                />
                <div className="cost-input-wrapper">
                  <span className="currency-symbol">£</span>
                  <input
                    type="number"
                    value={item.cost}
                    onChange={(e) => handleCostItemChange(index, 'cost', e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="total-cost">
                  £{calculateItemTotal(item).toFixed(2)}
                </div>
                {!isReadOnly && ( 
                  <button 
                    type="button" 
                    className="remove-cost-btn"
                    onClick={() => removeCostItem(index)}
                  >
                    ✖ 
                  </button>
                )}
              </div>
            ))}
            <div className={`total-row ${isReadOnly ? 'view-mode' : ''}`}> 
              <div className="total-label">Grand Total:</div>
              <div className="grand-total">£{calculateGrandTotal().toFixed(2)}</div>
              {!isReadOnly && <div></div>} 
            </div>
            {!isReadOnly && ( 
              <button 
                type="button" 
                className="add-cost-btn" 
                onClick={addCostItem}
              >
                + Add Item
              </button>
            )}
          </div>
        </div>

        <div className="form-group full-width">
          <label>Conclusive Statement:</label>
          <textarea 
            name="conclusion" 
            value={form.conclusion} 
            onChange={handleChange}
            placeholder={isReadOnly ? "N/A" : "How will you wrap up the session?"}
            rows="3"
            readOnly={isReadOnly}
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
              placeholder={isReadOnly ? "N/A" : "Reflect on the positive aspects"}
              rows="4" 
              readOnly={isReadOnly}
            />
          </div>
          <div className="form-group">
            <label>Even Better If (EBI):</label>
            <textarea 
              name="ebi" 
              value={form.ebi} 
              onChange={handleChange}
              placeholder={isReadOnly ? "N/A" : "Note areas for improvement"}
              rows="4" 
              readOnly={isReadOnly}
            />
          </div>
        </div>
      </div>

      <div className="form-buttons"> 
        {mode !== 'view' && (
          <button className="btn-save" onClick={handleSave}>
            <span>💾</span> {mode === 'edit' ? 'Update Session' : 'Save Session'}
          </button>
        )}
        <button className="btn-export" onClick={handleExportWord}>
          <span>⬇️</span> Export as Word
        </button>
        {mode !== 'view' && (
          <button className="btn-reset" onClick={handleReset}>
            <span>🔁</span> {mode === 'edit' ? 'Cancel Changes' : 'Reset Form'}
          </button>
        )}
        {mode === 'view' && sessionId && (
          <button className="btn-edit" onClick={() => navigate(`/planner?mode=edit&sessionId=${sessionId}`)}>
            <span>✏️</span> Edit Session
          </button>
        )}
      </div>
    </div>
  );
}
