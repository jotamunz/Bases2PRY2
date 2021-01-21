#!/usr/bin/env node
const dotenv = require('dotenv');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const SQLConnection = require('./config/mssqlConnection');
const FirestoreConnection = require('./config/firebaseConnection');
const exportFirebaseData = require('./lib/exportFirebaseData');
require('colors');

dotenv.config();

/**
 * Handles the user input
 */
const userInput = async () => {
  const questions = [
    {
      name: 'mode',
      type: 'list',
      message: 'Choose a data export mode',
      choices: ['Watch mode', 'Export once'],
    },
  ];
  // Wait for user input
  const inputData = await inquirer.prompt(questions);
  return inputData;
};

const checkExportMode = async (inputData) => {
  try {
    // Create database connections
    FirestoreConnection.connect();
    await SQLConnection.createConnection();
    // Check export mode
    const { mode } = inputData;
    if (mode === 'Export once') {
      await exportFirebaseData();
    } else {
      // TODO: Export firebase data in watch mode
    }
  } catch (error) {
    console.error(error);
  }
};

(async function () {
  try {
    // Show menu
    console.log(
      chalk.yellow(figlet.textSync('FirebaseETL', { horizontalLayout: 'full' }))
    );
    console.log(chalk.yellow('Firebase and Microsoft SQL Server ETL'));
    const inputData = await userInput();
    // Check export mode
    await checkExportMode(inputData);
  } catch (error) {
    console.error(error);
  }
})();
