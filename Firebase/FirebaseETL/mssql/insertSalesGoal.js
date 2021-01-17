const { connection } = require('../config/mssqlConnection');

const insertSalesGoal = async (salesGoalData) => {
  try {
    console.log('Inserting into Datawarehouse...');
    // Make query to database
    const request = connection.request();
    const result = await request.query('SELECT * FROM DIM_SELLER');
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = insertSalesGoal;
