const firebase = require('firebase');
require('firebase/firestore');

/**
 * Creates a new connection to Firebase and Cloud Firestore
 */
const createFirebaseConnection = () => {
  firebase.initializeApp({
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
  });
  const db = firebase.firestore();
  console.log('Connected to Firebase...'.yellow.bold);
  return db;
};

module.exports = createFirebaseConnection;
