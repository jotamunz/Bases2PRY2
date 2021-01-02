import { Component, OnInit } from '@angular/core';
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
    id: '',
    seller: null,
    brand: '',
    year: null,
    month: null,
    amount: 0,
  };

  constructor(
    private salesGoalService: SalesGoalsService,
    private flashMessageService: FlashMessagesService
  ) {}

  ngOnInit(): void {}

  public onSubmit(): void {
    console.log(this.salesGoal);
  }
}
