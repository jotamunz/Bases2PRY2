const sql = require('mssql');
const SQLConnection = require('../../config/mssqlConnection');

/**
 * Models that represents a group in the group dimension
 */
class GroupDimensionModel {
  constructor() {}

  /**
   * Gets a group by name
   * @param {string} name The group name
   */
  static async getGroupByName(name) {
    try {
      const { connection } = SQLConnection;
      const request = connection.request();
      // Prepare statement
      request.input('Name', sql.NVarChar, name);
      // Execute procedure
      const procedureResult = await request.execute('getGroupByName');
      return procedureResult.recordset;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = GroupDimensionModel;
