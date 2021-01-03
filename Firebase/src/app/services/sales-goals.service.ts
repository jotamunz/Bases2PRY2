import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { SalesGoal } from '../models/SalesGoal';

@Injectable({
  providedIn: 'root',
})
export class SalesGoalsService {
  constructor(private firestore: AngularFirestore) {}

  /**
   * Gets all the available sales goals
   */
  public getSalesGoals(): Observable<SalesGoal[]> {
    return this.firestore
      .collection<SalesGoal[]>('salesGoals')
      .valueChanges({ idField: 'id' });
  }

  /**
   * Adds a new sales goal
   * @param salesGoal The new sales goal that will be added
   */
  public addSalesGoal(salesGoal: SalesGoal): Promise<SalesGoal> {
    return this.firestore.collection<SalesGoal>('salesGoals').add(salesGoal);
  }

  /**
   * Get single sales goal document
   * @param id The sales goal id
   */
  public getSingleSalesGoal(id: string): Observable<SalesGoal> {
    return this.firestore
      .collection<SalesGoal>('salesGoals')
      .doc(id)
      .valueChanges({ idField: 'id' });
  }
}
