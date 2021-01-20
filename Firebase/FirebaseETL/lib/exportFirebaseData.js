const SalesGoalCollection = require('../firebase/collections/SalesGoalCollection');
const TimeDimensionModel = require('../mssql/models/TimeDimensionModel');
const SalesGoalModel = require('../mssql/models/SalesGoalModel');
const SQLConnection = require('../config/mssqlConnection');

/**
 * Exports all the new firebase documents
 */
const exportFirebaseData = async () => {
  try {
    // Get not exported sales goals
    const salesGoals = await SalesGoalCollection.getNotExported();
    // No new sales goals
    if (salesGoals.length == 0) {
      console.log('[FirebaseETL] No new sales goals...'.green);
      await SQLConnection.connection.close();
      return;
    }
    // Export new sales goals
    for (let salesGoal of salesGoals) {
      await exportSalesGoal(salesGoal);
    }
    await SQLConnection.connection.close();
  } catch (error) {
    console.log(
      '[FirebaseETL] Failed to insert into Data warehouse!!'.red.bold
    );
    console.error(error);
  }
};

/**
 * Exports a sales goal to the Data warehouse
 * @param {object} salesGoal A new sales goal
 */
const exportSalesGoal = async (salesGoal) => {
  try {
    const { year, month, brand, seller, amount } = salesGoal;
    // Get id from the time dimension
    const times = await TimeDimensionModel.getTimesByDate(year, month, 1);
    if (times.length === 0) {
      console.log(
        '[FirebaseETL] Could not found the time in the Time Dimension...'.red
      );
      return;
    }
    const timeId = times[0].ID;
    // Create new sales goal
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
    // Update sales goal document as exported
    salesGoal.exported = true;
    await salesGoal.update();
  } catch (error) {
    console.error(error);
  }
};

module.exports = exportFirebaseData;
