import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './sessionplanner.css';
import { db, auth } from '../utils/firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType, ImageRun } from 'docx';
import { saveAs } from 'file-saver';
import NavigationHeader from './dashboard/NavigationHeader';
import UserDetailsModal from './dashboard/UserDetailsModal';
import { useAuth } from '../hooks/useAuth';
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
  
  const {
    user,
    leaderDetails,
    showUserModal,
    setShowUserModal,
    loading: authLoading,
    handleLogout,
    canManageSessions,
    canManageMeetings
  } = useAuth();
  
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
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSavedData, setLastSavedData] = useState(null);
  const [lastChangeTime, setLastChangeTime] = useState(null);
  const [nextSaveTime, setNextSaveTime] = useState(null);
  const [timeUntilSave, setTimeUntilSave] = useState(null);
  
  // User details modal state and functions
  const [userDetailsForm, setUserDetailsForm] = useState({
    firstName: '',
    lastName: '',
    section: '',
    role: '',
    phone: ''
  });
  const [saving, setSaving] = useState(false);
  const [userError, setUserError] = useState(null);

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

            // Set initial saved data snapshot after loading
            setTimeout(() => {
              setLastSavedData(JSON.stringify({
                form: {
                  leader: data.leader || '',
                  group: data.section || '',
                  sessionDate: parseDate(data.date),
                  sessionTime: parseTime(data.date),
                  title: data.title || '',
                  badges: data.badges || '',
                  intro: data.intro || '',
                  islamic: data.islamic || '',
                  body: data.description || data.body || '',
                  activityLink: data.activityLink || '',
                  conclusion: data.conclusion || '',
                  www: data.www || '',
                  ebi: data.ebi || '',
                },
                selectedBadges: data.selectedBadges || [],
                checkedSteps: data.checkedSteps || {},
                costItems: Array.isArray(data.costBreakdown) && data.costBreakdown.length > 0 ? data.costBreakdown : [{ resource: '', quantity: 1, cost: '' }]
              }));
              setHasUnsavedChanges(false);
            }, 100);
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
  
  // Helper function to create a snapshot of current data for comparison
  const createDataSnapshot = () => {
    return JSON.stringify({
      form,
      selectedBadges,
      checkedSteps,
      costItems
    });
  };

  // Track changes for autosave
  useEffect(() => {
    if (!lastSavedData) {
      // Initialize lastSavedData on first load
      setLastSavedData(createDataSnapshot());
      return;
    }

    const currentData = createDataSnapshot();
    if (currentData !== lastSavedData) {
      setHasUnsavedChanges(true);
      if (!lastChangeTime) {
        setLastChangeTime(Date.now());
      }
    }
  }, [form, selectedBadges, checkedSteps, costItems]);

  // Autosave with both debounce (30 seconds) and maximum interval (2 minutes)
  useEffect(() => {
    if (mode === 'view') return;
    if (!hasUnsavedChanges) {
      setNextSaveTime(null);
      return;
    }
    if (!form.title || !form.sessionDate || !form.group) return;

    const DEBOUNCE_TIME = 30000; // 30 seconds after last change
    const MAX_SAVE_INTERVAL = 120000; // 2 minutes maximum between saves

    let timer;

    // Check if we've exceeded the maximum time since last change started
    if (lastChangeTime) {
      const timeSinceFirstChange = Date.now() - lastChangeTime;

      if (timeSinceFirstChange >= MAX_SAVE_INTERVAL) {
        // Force save immediately if we've been editing for 2+ minutes
        autoSave(false).then(() => {
          setLastChangeTime(null); // Reset the timer after save
          setNextSaveTime(null);
        });
        return;
      }

      // Otherwise set a timer for either 30 seconds or the remaining time to hit 2 minutes
      const remainingTime = Math.min(DEBOUNCE_TIME, MAX_SAVE_INTERVAL - timeSinceFirstChange);
      setNextSaveTime(Date.now() + remainingTime);

      timer = setTimeout(() => {
        autoSave(false).then(() => {
          setLastChangeTime(null); // Reset the timer after save
          setNextSaveTime(null);
        });
      }, remainingTime);
    } else {
      // Normal 30-second debounce
      setNextSaveTime(Date.now() + DEBOUNCE_TIME);

      timer = setTimeout(() => {
        autoSave(false).then(() => {
          setLastChangeTime(null); // Reset the timer after save
          setNextSaveTime(null);
        });
      }, DEBOUNCE_TIME);
    }

    // Cleanup function clears the timer if any dependency changes
    return () => clearTimeout(timer);
  }, [hasUnsavedChanges, form, selectedBadges, checkedSteps, costItems, mode, lastChangeTime]);

  // Update countdown timer display
  useEffect(() => {
    if (!nextSaveTime) {
      setTimeUntilSave(null);
      return;
    }

    const updateCountdown = () => {
      const now = Date.now();
      const timeLeft = Math.max(0, nextSaveTime - now);
      const seconds = Math.ceil(timeLeft / 1000);

      if (seconds <= 0) {
        setTimeUntilSave(null);
      } else {
        // Calculate force save time if applicable
        let forceSaveIn = null;
        if (lastChangeTime) {
          const timeSinceFirst = now - lastChangeTime;
          const forceSaveTime = Math.max(0, 120000 - timeSinceFirst);
          forceSaveIn = Math.ceil(forceSaveTime / 1000);
        }

        setTimeUntilSave({ seconds, forceSaveIn });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [nextSaveTime, lastChangeTime]);

  // Warn about unsaved changes when navigating away
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges && mode !== 'view') {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges, mode]);

  useEffect(() => {
    if (leaderDetails) {
      fetchLeaderDetails();
    }
  }, [leaderDetails]);

  const fetchLeaderDetails = async () => {
    if (leaderDetails) {
      const leaderName = `${leaderDetails.firstName || ''} ${leaderDetails.lastName || ''}`.trim();
      setForm(prevForm => ({
        ...prevForm,
        leader: prevForm.leader || leaderName,
        group: prevForm.group || leaderDetails.section || ''
      }));
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

  // Autosave function
  const autoSave = async (isManualSave = false) => {
    if (mode === 'view') return;

    // Don't autosave if required fields are missing
    if (!form.title || !form.sessionDate || !form.group) {
      return;
    }

    if (!user) return;

    // Prevent multiple simultaneous saves
    if (isSaving) return;

    setIsSaving(true);

    try {
      const sessionDate = new Date(form.sessionDate);
      const [hours, minutes] = form.sessionTime.split(':');
      sessionDate.setHours(parseInt(hours), parseInt(minutes), 0);

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
        startTime: form.sessionTime || '15:30',  // Add startTime field
        endTime: null,  // You can add an endTime field to the form if needed
        costBreakdown: costItems.map(item => ({
          ...item,
          totalCost: calculateItemTotal(item)
        })).filter(item => item.resource || item.cost),
        costTotal: calculateGrandTotal(),
        isSessionPlan: true,
        lastUpdatedAt: serverTimestamp(),
        autoSaved: !isManualSave,
      };

      // Always use the existing session ID if we have one
      if (sessionId) {
        // Update existing session
        const sessionDocRef = doc(db, 'sessions', sessionId);
        await updateDoc(sessionDocRef, {
          ...sessionData,
          updatedBy: user.uid
        });
      } else if (mode === 'create' && !sessionId) {
        // Only create a new session if we're in create mode AND don't have a session ID
        const docRef = await addDoc(collection(db, 'sessions'), {
          ...sessionData,
          createdAt: serverTimestamp(),
          createdBy: user.uid
        });

        // Important: Set the session ID immediately to prevent duplicate creation
        setSessionId(docRef.id);
        setMode('edit');
        navigate(`/planner?mode=edit&sessionId=${docRef.id}`, { replace: true });
      } else {
        // This shouldn't happen, but log it if it does
        console.error('Unexpected state: mode =', mode, 'sessionId =', sessionId);
        return;
      }

      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      setLastSavedData(createDataSnapshot()); // Update the saved data snapshot
      setLastChangeTime(null); // Reset the change timer

      if (isManualSave) {
        alert('Session saved successfully!');
      }

    } catch (error) {
      console.error('Error saving session:', error);
      if (isManualSave) {
        alert('Failed to save session.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    await autoSave(true);
  };

  // Helper function to fetch image as base64
  const fetchImageAsBase64 = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error fetching badge image:', error);
      return null;
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
                ...(await Promise.all(selectedBadges.map(async (badge) => {
                  const badgeElements = [];

                  // Try to add badge icon
                  if (badge.image) {
                    const imageBase64 = await fetchImageAsBase64(badge.image);
                    if (imageBase64) {
                      badgeElements.push(
                        new Paragraph({
                          children: [
                            new ImageRun({
                              data: imageBase64,
                              transformation: {
                                width: 60,
                                height: 60
                              }
                            })
                          ],
                          spacing: { after: 100 }
                        })
                      );
                    }
                  }

                  // Add badge name
                  badgeElements.push(
                    new Paragraph({
                      text: badge.name,
                      heading: HeadingLevel.HEADING_4,
                    })
                  );

                  // Add badge steps
                  if (badge.steps) {
                    badgeElements.push(
                      ...badge.steps.map(step =>
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: checkedSteps[badge.name]?.[step] ? "☑ " : "□ ",
                              bold: true,
                            }),
                            new TextRun(step),
                          ],
                        })
                      )
                    );
                  }

                  badgeElements.push(new Paragraph({ text: "" }));
                  return badgeElements;
                }))).flat(),
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

  // User details form handlers
  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetailsForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUserDetailsSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setUserError(null);

    try {
      const { doc, setDoc } = await import('firebase/firestore');
      const { db } = await import('../utils/firebase');
      
      const leaderRef = doc(db, 'leaders', user.uid);
      await setDoc(leaderRef, {
        firstName: userDetailsForm.firstName,
        lastName: userDetailsForm.lastName,
        section: userDetailsForm.section,
        role: userDetailsForm.role,
        phone: userDetailsForm.phone,
        email: user.email,
        uid: user.uid
      }, { merge: true });

      setShowUserModal(false);
      return true;
    } catch (error) {
      console.error('Error updating user details:', error);
      setUserError('Failed to update details. Please try again.');
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Initialize user details form when modal opens
  React.useEffect(() => {
    if (showUserModal && leaderDetails) {
      setUserDetailsForm({
        firstName: leaderDetails.firstName || '',
        lastName: leaderDetails.lastName || '',
        section: leaderDetails.section || 'Beavers',
        role: leaderDetails.role || '',
        phone: leaderDetails.phone || ''
      });
    }
  }, [showUserModal, leaderDetails]);

  const isReadOnly = mode === 'view';

  if (authLoading || isLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="session-planner">
      <NavigationHeader
        user={user}
        leaderDetails={leaderDetails}
        setShowUserModal={setShowUserModal}
        handleLogout={handleLogout}
        canManageSessions={canManageSessions}
        canManageMeetings={canManageMeetings}
        hasUnsavedChanges={hasUnsavedChanges && mode !== 'view'}
        onSaveBeforeNavigate={() => autoSave(true)}
      />

      {/* Floating Autosave Status Widget */}
      {mode !== 'view' && (
        <div className="autosave-widget">
          {isSaving && <div className="autosave-item saving">🔄 Saving...</div>}
          {!isSaving && lastSaved && !hasUnsavedChanges && (
            <div className="autosave-item saved">
              ✅ Saved
              <span className="save-time">{lastSaved.toLocaleTimeString()}</span>
            </div>
          )}
          {!isSaving && hasUnsavedChanges && timeUntilSave && (
            <div className="autosave-item pending">
              ⏱️ Autosave in {timeUntilSave.seconds}s
              {timeUntilSave.forceSaveIn && timeUntilSave.forceSaveIn <= 120 && (
                <div className="force-save-warning">Force save in {timeUntilSave.forceSaveIn}s</div>
              )}
            </div>
          )}
          {hasUnsavedChanges && !isSaving && (
            <button
              className="manual-save-btn"
              onClick={handleSave}
              title="Save now"
            >
              💾 Save Now
            </button>
          )}
        </div>
      )}

      <div className="session-planner-content">
        <div className="planner-header">
        <button className="btn-back-top" onClick={() => {
          if (hasUnsavedChanges && mode !== 'view') {
            if (window.confirm('You have unsaved changes. Do you want to save before leaving?')) {
              autoSave(true).then(() => navigate(-1));
            } else if (window.confirm('Are you sure you want to leave without saving? Your changes will be lost.')) {
              navigate(-1);
            }
          } else {
            navigate(-1);
          }
        }}>
          <span>←</span> Back
        </button>
        <h1>{mode === 'view' ? 'View Session Plan' : mode === 'edit' ? 'Edit Session Plan' : '🧭 Session Planner'}</h1>
        <p>{mode === 'view' ? 'Reviewing session details.' : 'Create and manage your Scout sessions.'}</p>
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
          <button className="btn-save" onClick={handleSave} disabled={isSaving}>
            <span>💾</span> {mode === 'edit' ? 'Update Session' : 'Save Session'}
          </button>
        )}
        <button className="btn-export" onClick={handleExportWord}>
          <span>⬇️</span> Export as Word
        </button>
        {mode === 'view' && sessionId && (
          <button className="btn-edit" onClick={() => navigate(`/planner?mode=edit&sessionId=${sessionId}`)}>
            <span>✏️</span> Edit Session
          </button>
        )}
      </div>
      </div>
      
      {showUserModal && (
        <UserDetailsModal
          showModal={showUserModal}
          setShowModal={setShowUserModal}
          leaderDetails={userDetailsForm}
          handleInputChange={handleUserInputChange}
          handleSubmit={handleUserDetailsSubmit}
          saving={saving}
          error={userError}
          user={user}
        />
      )}
    </div>
  );
}
