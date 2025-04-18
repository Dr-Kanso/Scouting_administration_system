import { collection, query, where, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, orderBy, arrayUnion, arrayRemove, Timestamp, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

// Collection references
const membersRef = collection(db, 'members');

// Get all members
export const getAllMembers = async () => {
  const q = query(membersRef, orderBy('firstName'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Get members by section
export const getMembersBySection = async (section) => {
  try {
    let q;
    
    if (section) {
      console.log(`Querying Firestore for section: ${section}`);
      q = query(membersRef, where('section', '==', section), orderBy('firstName'));
    } else {
      q = query(membersRef, orderBy('firstName'));
    }
    
    const snapshot = await getDocs(q);
    console.log(`Found ${snapshot.docs.length} members in section: ${section}`);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error in getMembersBySection for ${section}:`, error);
    throw error;
  }
};

// Get member by ID
export const getMemberById = async (id) => {
  const docRef = doc(db, 'members', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    };
  } else {
    throw new Error('Member not found');
  }
};

// Add new member
export const addNewMember = async (memberData) => {
  try {
    const docRef = await addDoc(membersRef, {
      ...memberData,
      joinDate: new Date(),
      active: true
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding member:', error);
    throw error;
  }
};

// Update member
export const updateMember = async (id, memberData) => {
  try {
    const memberRef = doc(db, 'members', id);
    await updateDoc(memberRef, memberData);
    return true;
  } catch (error) {
    console.error("Error updating member: ", error);
    throw error;
  }
};

// Delete member
export const deleteMember = async (id) => {
  const docRef = doc(db, 'members', id);
  try {
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting member:', error);
    throw error;
  }
};

// Search members by name
export const searchMembersByName = async (searchTerm) => {
  const q = query(membersRef, orderBy('firstName'));
  const snapshot = await getDocs(q);
  
  // Client-side filtering since Firestore doesn't support contains/startsWith queries directly
  return snapshot.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    .filter(member => 
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

// Get members by age range
export const getMembersByAgeRange = async (minAge, maxAge) => {
  const today = new Date();
  
  // Calculate the date for minimum and maximum ages
  const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
  const minDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
  
  const q = query(membersRef);
  const snapshot = await getDocs(q);
  
  return snapshot.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    .filter(member => {
      const dob = member.dateOfBirth?.toDate ? member.dateOfBirth.toDate() : new Date(member.dateOfBirth);
      return dob >= minDate && dob <= maxDate;
    });
};

// Get active/inactive members
export const getMembersByStatus = async (active = true) => {
  const q = query(membersRef, where('active', '==', active), orderBy('firstName'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Badge tracking
// Add badge to member
export const addBadgeToMember = async (memberId, badgeData) => {
  const memberRef = doc(db, 'members', memberId);
  
  try {
    await updateDoc(memberRef, {
      badges: arrayUnion({
        ...badgeData,
        dateAwarded: Timestamp.now(),
        id: Date.now().toString()
      })
    });
    return true;
  } catch (error) {
    console.error('Error adding badge:', error);
    throw error;
  }
};

// Remove badge from member
export const removeBadgeFromMember = async (memberId, badgeId) => {
  const memberRef = doc(db, 'members', memberId);
  const memberDoc = await getDoc(memberRef);
  
  if (!memberDoc.exists()) {
    throw new Error('Member not found');
  }
  
  const memberData = memberDoc.data();
  const badgeToRemove = memberData.badges?.find(badge => badge.id === badgeId);
  
  if (!badgeToRemove) {
    throw new Error('Badge not found');
  }
  
  try {
    await updateDoc(memberRef, {
      badges: arrayRemove(badgeToRemove)
    });
    return true;
  } catch (error) {
    console.error('Error removing badge:', error);
    throw error;
  }
};

// Attendance tracking
// Record attendance for a session
export const recordAttendance = async (sessionId, attendees) => {
  const attendanceRef = doc(db, 'attendance', sessionId);
  
  try {
    await setDoc(attendanceRef, {
      date: Timestamp.now(),
      attendees: attendees,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error recording attendance:', error);
    throw error;
  }
};

// Get attendance for a member
export const getMemberAttendance = async (memberId) => {
  const attendanceCollection = collection(db, 'attendance');
  const q = query(attendanceCollection);
  const snapshot = await getDocs(q);
  
  const attendanceRecords = [];
  
  snapshot.docs.forEach(doc => {
    const sessionData = doc.data();
    if (sessionData.attendees && sessionData.attendees.includes(memberId)) {
      attendanceRecords.push({
        sessionId: doc.id,
        date: sessionData.date,
        ...sessionData
      });
    }
  });
  
  return attendanceRecords;
};

// Get emergency contacts for a member
export const getMemberEmergencyContacts = async (memberId) => {
  const member = await getMemberById(memberId);
  return member.emergencyContacts || [];
};

// Update emergency contacts for a member
export const updateMemberEmergencyContacts = async (memberId, contacts) => {
  const memberRef = doc(db, 'members', memberId);
  
  try {
    await updateDoc(memberRef, {
      emergencyContacts: contacts
    });
    return true;
  } catch (error) {
    console.error('Error updating emergency contacts:', error);
    throw error;
  }
};
