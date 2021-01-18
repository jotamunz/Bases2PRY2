import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SalesGoalsService } from '../../services/sales-goals.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidationService } from '../../services/validation.service';

import { SalesGoal } from '../../models/SalesGoal';
import { ValidationError } from '../../models/ValidationError';

@Component({
  selector: 'app-edit-sales-goal',
  templateUrl: './edit-sales-goal.component.html',
  styleUrls: ['./edit-sales-goal.component.css'],
})
export class EditSalesGoalComponent implements OnInit {
  public salesGoal: SalesGoal = {
    seller: null,
    brand: null,
    year: null,
    month: null,
    amount: 0,
  };
  private salesGoalId: string;
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
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get sales goal id
    this.route.params.subscribe((params) => {
      const { id } = params;
      this.salesGoalId = id;
      // Fetch sales goal
      this.salesGoalService
        .getSingleSalesGoalWithoutId(id)
        .subscribe((salesGoal: SalesGoal) => {
          this.salesGoal = salesGoal;
        });
    });
  }

  public async onSubmit(): Promise<void> {
    try {
      this.salesGoal.month = parseInt(this.salesGoal.month.toString());
      // Validate data
      let errors: ValidationError[] = this.validationService.validateSalesGoal(
        this.salesGoal
      );
      if (errors.length > 0) {
        errors.forEach((error: ValidationError) => {
          this.flashMessageService.show(error.message, {
            cssClass: 'alert alert-danger',
          });
        });
        return;
      }
      // Edit sales goal
      await this.salesGoalService.editSalesGoal(
        this.salesGoalId,
        this.salesGoal
      );
      this.flashMessageService.show('Sales goal updated', {
        cssClass: 'alert alert-success',
      });
      this.router.navigateByUrl(`/salesGoals/${this.salesGoalId}`);
    } catch (err) {
      console.error(err);
    }
  }
}
