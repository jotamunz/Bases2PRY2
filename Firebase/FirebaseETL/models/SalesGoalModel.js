const sql = require('mssql');
const { connection } = require('../config/mssqlConnection');

/**
 * Models that represents a sales goal in the FACT_GOALS table
 */
class SalesGoalModel {
  static dbConnection = connection;

  constructor(salesGoalData) {
    const { seller, brand, amount, timeId } = salesGoalData;
    this.seller = seller;
    this.brand = brand;
    this.amount = amount;
    // TODO: Change this value
    // It will be hardcoded for testing
    this.timeId = 1;
  }

  /**
   * Inserts a new sales goal into the Data Warehouse
   */
  async insertSalesGoal() {
    try {
      const request = connection.request();
      // Prepare execute statement
      request.input('SellerId', sql.Int, this.seller);
      request.input('GroupId', sql.Int, this.brand);
      request.input('TimeId', sql.Int, 1);
      request.input('Amount', sql.Decimal(18, 4), this.amount);
      // Execute stored procedure
      await request.execute('insertSalesGoal');
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = SalesGoalModel;
