const createFirebaseConnection = require('../../config/firebaseConnection');
const insertSalesGoal = require('../../mssql/insertSalesGoal');

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
      snapshot.docChanges().forEach(handleSalesGoalChange);
    }
  });
};

/**
 * Handles a new sales goal change
 */
const handleSalesGoalChange = async (fsChange) => {
  try {
    if (fsChange.type === 'added') {
      console.log('[FirebaseETL] New change detected in firestore!'.yellow);
      // Get change data
      const newSalesGoal = fsChange.doc.data();
      // Insert sales goal into data warehouse
      await insertSalesGoal(newSalesGoal);
    }
  } catch (error) {
    console.log('Failed to insert into Data warehouse!!'.red.bold);
  }
};

module.exports = listenForSalesGoalsChanges;
