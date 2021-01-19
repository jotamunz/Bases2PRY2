const sql = require('mssql');
const dotenv = require('dotenv');
require('colors');

dotenv.config();

/**
 * Handles connectivity with Microsoft SQL Server
 */
class SQLConnection {
  static config = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    server: process.env.MSSQL_HOST,
    database: process.env.MSSQL_DB_NAME,
    port: 1433,
    options: { encrypt: true, enableArithAbort: true },
  };
  static connection = new sql.ConnectionPool(this.config);

  constructor() {}

  /**
   * Creates connection to MSSQL Database
   */
  static async createConnection() {
    try {
      await this.connection.connect();
      console.log('Connected to MSSQL...'.blue.bold);
    } catch (err) {
      console.log(`Could not connect to MSSQL...`.red.bold);
      console.error(err);
    }
  }
}

module.exports = SQLConnection;
