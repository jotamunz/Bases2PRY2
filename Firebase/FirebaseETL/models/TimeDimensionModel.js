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
   * Gets all the available times in the time dimension
   */
  static async getATimes() {
    try {
      const request = this.dbConnection.request();
      // Execute query
      // TODO: Change this to a prepared statement
      const result = await request.query('SELECT * FROM DIM_TIME');
      return result.recordset;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = TimeDimensionModel;
