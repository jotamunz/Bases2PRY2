const firebase = require('firebase');
require('firebase/firestore');
require('colors');

firebase.initializeApp({
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
});
const db = firebase.firestore();

module.exports = db;
