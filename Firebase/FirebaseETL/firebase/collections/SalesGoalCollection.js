const FirestoreConnection = require('../../config/firebaseConnection');

/**
 * Handles documents for sales goals
 */
class SalesGoalCollection {
  constructor(salesGoalData) {
    const { year, month, amount, id, seller, brand, exported } = salesGoalData;
    this.year = year;
    this.month = month;
    this.amount = amount;
    this.id = id;
    this.seller = seller;
    this.brand = brand;
    this.exported = exported;
  }

  /**
   * Gets the documents that have not been exported
   */
  static async getNotExported() {
    try {
      // Get sales goals
      const querySnapshot = await FirestoreConnection.fs
        .collection('salesGoals')
        .where('exported', '==', false)
        .get();
      let salesGoals = [];
      // Create sales goals objects
      querySnapshot.forEach((doc) => {
        salesGoals.push(
          new SalesGoalCollection({
            ...doc.data(),
            id: doc.id,
          })
        );
      });
      return salesGoals;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Updates the sales goal
   */
  async update() {
    try {
      const { year, month, amount, seller, brand, exported } = this;
      await FirestoreConnection.fs.collection('salesGoals').doc(this.id).set({
        year,
        month,
        amount,
        seller,
        brand,
        exported,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = SalesGoalCollection;
