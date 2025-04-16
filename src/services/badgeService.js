import { collection, query, where, getDocs, doc, getDoc, addDoc, updateDoc, orderBy } from 'firebase/firestore';
import { db } from '../utils/firebase';

// Collection references
const badgesRef = collection(db, 'badges');
const memberBadgesRef = collection(db, 'memberBadges');

// Get badges by section
export const getBadgesBySection = async (section) => {
  try {
    let q;
    
    if (section === 'all') {
      q = query(badgesRef, orderBy('name'));
    } else {
      q = query(
        badgesRef, 
        where('section', '==', section), 
        orderBy('name')
      );
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching badges by section:', error);
    return []; // Return empty array instead of throwing error
  }
};

// Get badge by ID
export const getBadgeById = async (id) => {
  const docRef = doc(db, 'badges', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    };
  } else {
    throw new Error('Badge not found');
  }
};

// Get member badges
export const getMemberBadges = async (memberId) => {
  const q = query(memberBadgesRef, where('memberId', '==', memberId));
  const snapshot = await getDocs(q);
  
  const memberBadges = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  
  // Fetch full badge details for each badge
  const badgesWithDetails = await Promise.all(
    memberBadges.map(async (memberBadge) => {
      try {
        const badge = await getBadgeById(memberBadge.badgeId);
        return {
          ...memberBadge,
          badgeDetails: badge
        };
      } catch (error) {
        console.error(`Error fetching badge details for ${memberBadge.badgeId}:`, error);
        return memberBadge;
      }
    })
  );
  
  return badgesWithDetails;
};

// Assign badge to member
export const assignBadgeToMember = async (memberId, badgeId) => {
  // Check if already assigned
  const q = query(
    memberBadgesRef,
    where('memberId', '==', memberId),
    where('badgeId', '==', badgeId)
  );
  
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    throw new Error('Badge already assigned to this member');
  }
  
  // Get badge details to set up requirements
  const badge = await getBadgeById(badgeId);
  
  // Create requirements array with all items uncompleted
  const requirements = badge.requirements.map(req => ({
    requirementId: req.id,
    completed: false,
    dateCompleted: null,
    verifiedBy: null,
    notes: ''
  }));
  
  // Create new member badge record
  try {
    const docRef = await addDoc(memberBadgesRef, {
      memberId,
      badgeId,
      status: 'in-progress',
      dateAwarded: null,
      dateStarted: new Date(),
      requirements,
      overallProgress: 0,
      notes: ''
    });
    return docRef.id;
  } catch (error) {
    console.error('Error assigning badge:', error);
    throw error;
  }
};

// Update badge progress
export const updateBadgeProgress = async (memberBadgeId, updatedRequirements) => {
  const docRef = doc(db, 'memberBadges', memberBadgeId);
  
  // Calculate overall progress
  const totalRequirements = updatedRequirements.length;
  const completedRequirements = updatedRequirements.filter(req => req.completed).length;
  const overallProgress = Math.round((completedRequirements / totalRequirements) * 100);
  
  // Determine if badge is complete
  const status = overallProgress === 100 ? 'earned' : 'in-progress';
  const dateAwarded = status === 'earned' ? new Date() : null;
  
  try {
    await updateDoc(docRef, {
      requirements: updatedRequirements,
      overallProgress,
      status,
      dateAwarded
    });
    return true;
  } catch (error) {
    console.error('Error updating badge progress:', error);
    throw error;
  }
};
