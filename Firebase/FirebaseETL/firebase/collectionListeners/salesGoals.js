const createFirebaseConnection = require('../../config/firebaseConnection');
const SalesGoalModel = require('../../models/SalesGoalModel');
const TimeDimensionModel = require('../../models/TimeDimensionModel');

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
      const { year, month, brand, seller, amount } = fsChange.doc.data();
      // Get id for time in the Time Dimension
      const times = await TimeDimensionModel.getTimesByDate(year, month, 1);
      // TODO: Insert in time dimension if time does not exist?
      if (times.length === 0) {
        console.log(
          '[FirebaseETL] Could not found the time in the Time Dimension...'.red
        );
        return;
      }
      const timeId = times[0].ID;
      // Create sales goal
      const newSalesGoal = new SalesGoalModel({
        seller,
        brand,
        amount,
        timeId,
      });
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
