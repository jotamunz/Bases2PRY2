const createFirebaseConnection = require('../config/firebaseConnection');

/**
 * Listen for changes in the cloud fire store
 */
const listenForSalesGoalsChanges = () => {
  let hasChanged = false;
  const db = createFirebaseConnection();
  // Wait for snapshot change
  db.collection('salesGoals').onSnapshot((snapshot) => {
    // Check if new change
    if (!hasChanged) {
      hasChanged = true;
    } else {
      console.log('[FirebaseETL] New change detected in firestore!'.yellow);
      snapshot.docChanges().forEach(handleSalesGoalChange);
    }
  });
};

/**
 * Handles a new sales goal change
 */
const handleSalesGoalChange = async (fsChange) => {
  if (fsChange.type === 'added') {
    // Get change data
    console.log(fsChange.doc.data());
  }
};

module.exports = listenForSalesGoalsChanges;
