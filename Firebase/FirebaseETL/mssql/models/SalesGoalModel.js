const sql = require('mssql');
const SQLConnection = require('../../config/mssqlConnection');

/**
 * Models that represents a sales goal in the FACT_GOALS table
 */
class SalesGoalModel {
  constructor(salesGoalData) {
    const { seller, brand, amount, timeId } = salesGoalData;
    this.seller = seller;
    this.brand = brand;
    this.amount = amount;
    this.timeId = timeId;
  }

  /**
   * Inserts a new sales goal into the Data Warehouse
   */
  async insertSalesGoal() {
    try {
      const { connection } = SQLConnection;
      const request = connection.request();
      // Prepare execute statement
      request.input('SellerId', sql.Int, this.seller);
      request.input('GroupId', sql.Int, this.brand);
      request.input('TimeId', sql.Int, this.timeId);
      request.input('Amount', sql.Decimal(18, 4), this.amount);
      // Execute stored procedure
      await request.execute('insertSalesGoal');
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = SalesGoalModel;
