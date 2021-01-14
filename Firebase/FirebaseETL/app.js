require('dotenv').config();
const { connectToMSSQL } = require('./config/mssqlConnection');
const listenForSalesGoalsChanges = require('./firebase/salesGoals');
require('colors');

// Connect to MSSQL
connectToMSSQL();

// Listen for changes
listenForSalesGoalsChanges();
