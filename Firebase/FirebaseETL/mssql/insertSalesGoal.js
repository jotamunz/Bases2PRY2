const sql = require('mssql');
const { connection } = require('../config/mssqlConnection');
require('colors');

/**
 * Inserts a new sales goal in the data warehouse
 * @param {Object} salesGoalData The sales goal data to be inserted in the dw
 */
const insertSalesGoal = async (salesGoalData) => {
  try {
    console.log('[FirebaseETL] Inserting into Datawarehouse...'.gray);
    const request = connection.request();
    const { seller, brand, year, month, amount } = salesGoalData;
    // Prepare execute statement
    request.input('SellerId', sql.Int, seller);
    request.input('GroupId', sql.Int, brand);
    // This is just a test value
    // TODO: Check how to manage the time dimension
    request.input('TimeId', sql.Int, 1);
    // TODO: Manage dollar exchange
    request.input('Amount', sql.Decimal(18, 4), amount);
    // Execute stored procedure
    await request.execute('insertSalesGoal');
    console.log(
      '[FirebaseETL] Inserted sales goal into Data Warehouse!!'.green.bold
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = insertSalesGoal;
