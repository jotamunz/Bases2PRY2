import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesGoalsService } from '../../services/sales-goals.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { SalesGoal } from '../../models/SalesGoal';

@Component({
  selector: 'app-add-sales-goal',
  templateUrl: './add-sales-goal.component.html',
  styleUrls: ['./add-sales-goal.component.css'],
})
export class AddSalesGoalComponent implements OnInit {
  public salesGoal: SalesGoal = {
    seller: null,
    brand: '',
    year: null,
    month: null,
    amount: 0,
  };
  public months: object[] = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' },
  ];

  constructor(
    private salesGoalService: SalesGoalsService,
    private flashMessageService: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public async onSubmit(): Promise<void> {
    try {
      // Add sales goal
      await this.salesGoalService.addSalesGoal(this.salesGoal);
      // Show message & redirect
      this.flashMessageService.show('Sales goal added', {
        cssClass: 'alert alert-success',
      });
      this.router.navigateByUrl('/');
    } catch (err) {
      console.error(err);
    }
  }
}
