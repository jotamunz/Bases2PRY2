const firebaseDb = require('../../config/firebaseConnection');

class SalesGoalCollection {
  static conn = firebaseDb.collection('salesGoals');

  constructor() {}

  static async getNotExported() {
    try {
      const querySnapshot = await this.conn
        .where('exported', '==', false)
        .get();
      return querySnapshot;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = SalesGoalCollection;
