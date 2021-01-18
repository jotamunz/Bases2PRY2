const sql = require('mssql');
const { connection } = require('../config/mssqlConnection');

/**
 * Model that represents the time dimension in the data warehouse
 */
class TimeDimensionModel {
  static dbConnection = connection;

  constructor(timeDimensionData) {
    const { year, month } = timeDimensionData;
    this.year = year;
    this.month = month;
  }

  /**
   * Gets all the times in the time dimension by year, month and day
   * @param {number} year The year of the time dimension
   * @param {number} month The month of the time dimension
   * @param {number} day The day of the time dimension
   */
  static async getTimesByDate(year, month, day) {
    try {
      const request = this.dbConnection.request();
      // Prepare statement
      request.input('Year', sql.Int, year);
      request.input('Month', sql.Int, month);
      request.input('day', sql.Int, day);
      // Execute procedure
      const procedureResult = await request.execute('getTimesByDate');
      return procedureResult.recordset;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = TimeDimensionModel;
