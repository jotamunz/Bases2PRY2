const listenForSalesGoalsChanges = require('./firebase/salesGoals');
const dotenv = require('dotenv');
require('colors');

// Initialize environment variables
dotenv.config();

listenForSalesGoalsChanges();
