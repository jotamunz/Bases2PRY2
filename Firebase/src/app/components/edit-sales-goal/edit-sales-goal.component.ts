import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SalesGoalsService } from '../../services/sales-goals.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { SalesGoal } from '../../models/SalesGoal';

@Component({
  selector: 'app-edit-sales-goal',
  templateUrl: './edit-sales-goal.component.html',
  styleUrls: ['./edit-sales-goal.component.css'],
})
export class EditSalesGoalComponent implements OnInit {
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const { id } = params;
      this.salesGoalService
        .getSingleSalesGoal(id)
        .subscribe((salesGoal: SalesGoal) => {
          this.salesGoal = salesGoal;
        });
    });
  }

  public onSubmit(): void {
    // Edit sales goal
    this.salesGoalService
      .editSalesGoal(this.salesGoal)
      .then(() => {
        this.flashMessageService.show('Sales goal updated', {
          cssClass: 'alert alert-success',
        });
        this.router.navigateByUrl(`/salesGoals/${this.salesGoal.id}`);
      })
      .catch((err) => console.error(err));
  }
}
