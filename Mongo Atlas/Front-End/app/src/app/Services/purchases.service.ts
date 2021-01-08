import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from '../Models/purchaseModel';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor(
    private httpClient: HttpClient, 
  ) { }

  /**
   * Registers a new user
   * @param user User data to register
   */
  public addPurchase(purchase: Purchase): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:3000/',
      purchase,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
