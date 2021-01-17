const dotenv = require('dotenv');
const { connectToMSSQL } = require('./config/mssqlConnection');
const listenForSalesGoalsChanges = require('./firebase/salesGoals');
require('colors');

// Load environment variables
dotenv.config();

// Connect to MSSQL
connectToMSSQL();

// Listen for changes
listenForSalesGoalsChanges();
