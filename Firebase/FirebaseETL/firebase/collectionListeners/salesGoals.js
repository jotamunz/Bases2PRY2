const createFirebaseConnection = require('../../config/firebaseConnection');

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
      // TODO: Manage the Time Dimension ID
      // Get change data
      const newSalesGoal = new SalesGoalModel(fsChange.doc.data());
      console.log('[FirebaseETL] Inserting into Datawarehouse...'.gray);
      // Insert into Data Warehouse
      await newSalesGoal.insertSalesGoal();
      console.log(
        '[FirebaseETL] Inserted sales goal into Data Warehouse!!'.green.bold
      );
    }
  } catch (error) {
    console.log('Failed to insert into Data warehouse!!'.red.bold);
    console.error(error);
  }
};

module.exports = listenForSalesGoalsChanges;
