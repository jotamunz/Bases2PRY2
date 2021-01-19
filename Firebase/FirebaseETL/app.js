const dotenv = require('dotenv');
const FirebaseConnection = require('./config/firebaseConnection');
const SQLConnection = require('./config/mssqlConnection');
require('colors');

dotenv.config();

// Create database connections
FirebaseConnection.createFirestoreConnection();
SQLConnection.createConnection();
