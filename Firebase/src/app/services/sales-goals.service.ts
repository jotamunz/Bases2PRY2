import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
      .collection('salesGoals')
      .valueChanges({ idField: 'id' });
  }
}
