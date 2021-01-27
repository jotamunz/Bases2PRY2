const sql = require('mssql');
const SQLConnection = require('../../config/mssqlConnection');

/**
 * Models that represents a seller in the Seller Dimension
 */
class SellerDimensionModel {
  constructor() {}

  /**
   * Gets seller by code
   * @param {number} code
   */
  static async getSellerByCode(code) {
    try {
      const { connection } = SQLConnection;
      const request = connection.request();
      // Prepare statement
      request.input('Code', sql.Int, code);
      // Execute procedure
      const procedureResult = await request.execute('getSellerByCode');
      return procedureResult.recordset;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = SellerDimensionModel;
