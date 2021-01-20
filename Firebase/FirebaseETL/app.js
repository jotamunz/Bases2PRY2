#!/usr/bin/env node
const dotenv = require('dotenv');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const SQLConnection = require('./config/mssqlConnection');
require('colors');

const exportFirebaseData = require('./lib/exportFirebaseData');

dotenv.config();

const userInput = async () => {
  const questions = [
    {
      name: 'mode',
      type: 'list',
      message: 'Choose a data export mode',
      choices: ['Watch mode', 'Export once'],
    },
  ];
  const inputData = await inquirer.prompt(questions);
  return inputData;
};

const checkExportMode = async (inputData) => {
  try {
    // Check export mode
    const { mode } = inputData;
    if (mode === 'Export once') {
      await exportFirebaseData();
    } else {
      // TODO: Export firebase data in watch mode
    }
  } catch (error) {}
};

(async function () {
  try {
    // Show menu
    console.log(
      chalk.yellow(figlet.textSync('FirebaseETL', { horizontalLayout: 'full' }))
    );
    console.log(chalk.yellow('Firebase and Microsoft SQL Server ETL'));
    const inputData = await userInput();
    // Create database connections
    await SQLConnection.createConnection();
    await checkExportMode(inputData);
    console.log('finished...');
  } catch (error) {}
})();
