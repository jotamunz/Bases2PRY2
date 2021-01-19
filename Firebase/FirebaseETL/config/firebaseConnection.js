const firebase = require('firebase');
require('firebase/firestore');
require('colors');

/**
 * Handles connection to firebase and its modules
 */
class FirebaseConnection {
  static firestoreConnection = null;

  constructor() {}

  /**
   * Creates a new connection to Firebase and Cloud Firestore
   */
  static createFirestoreConnection() {
    try {
      firebase.initializeApp({
        apiKey: process.env.FB_API_KEY,
        authDomain: process.env.FB_AUTH_DOMAIN,
        projectId: process.env.FB_PROJECT_ID,
      });
      this.firestoreConnection = firebase.firestore();
      console.log('Connected to Firebase...'.yellow.bold);
    } catch (error) {
      console.log('Couldnt connect to firestore...'.red.bold);
      console.error(error);
    }
  }
}

module.exports = FirebaseConnection;
