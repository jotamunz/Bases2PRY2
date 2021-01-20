const firebase = require('firebase');
require('firebase/firestore');

/**
 * Handles connection with firestore database
 */
class FirestoreConnection {
  static fs = null;

  /**
   * Initializes firebase and connects
   */
  static connect() {
    firebase.initializeApp({
      apiKey: process.env.FB_API_KEY,
      authDomain: process.env.FB_AUTH_DOMAIN,
      projectId: process.env.FB_PROJECT_ID,
    });
    this.fs = firebase.firestore();
  }
}

module.exports = FirestoreConnection;
