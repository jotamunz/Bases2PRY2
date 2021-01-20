const SalesGoalCollection = require('../firebase/collections/SalesGoalCollection');
const TimeDimensionModel = require('../mssql/models/TimeDimensionModel');
const SalesGoalModel = require('../mssql/models/SalesGoalModel');

const exportFirebaseData = async () => {
  try {
    // Get not exported sales goals
    const salesGoals = await SalesGoalCollection.getNotExported();
    salesGoals.forEach(async (salesGoal) => {
      try {
        const { year, month, brand, seller, amount } = salesGoal.data();
        // Get id from the time dimension
        const times = await TimeDimensionModel.getTimesByDate(year, month, 1);
        if (times.length === 0) {
          console.log(
            '[FirebaseETL] Could not found the time in the Time Dimension...'
              .red
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
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.log('Failed to insert into Data warehouse!!'.red.bold);
    console.error(error);
  }
};

module.exports = exportFirebaseData;
