const sql = require('mssql');
require('colors');

const config = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  server: 'localhost',
  database: process.env.MSSQL_DB_NAME,
  port: 1433,
  options: { encrypt: true, enableArithAbort: true },
};

// Create SQL server connection
const connection = new sql.ConnectionPool(config);

async function connectToMSSQL() {
  try {
    await connection.connect();
    console.log('Connected to MSSQL...'.blue.bold);
  } catch (err) {
    console.log(`Could not connect to MSSQL...`.red.bold);
    console.error(err);
  }
}

module.exports = {
  connection,
  connectToMSSQL,
};
