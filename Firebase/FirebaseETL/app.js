const dotenv = require('dotenv');
const { connectToMSSQL } = require('./config/mssqlConnection');
const listenForSalesGoalsChanges = require('./firebase/collectionListeners/salesGoals');
require('colors');

dotenv.config();

connectToMSSQL();
listenForSalesGoalsChanges();
