import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SalesGoalsService } from '../../services/sales-goals.service';

import { SalesGoal } from '../../models/SalesGoal';

@Component({
  selector: 'app-sales-goal-details',
  templateUrl: './sales-goal-details.component.html',
  styleUrls: ['./sales-goal-details.component.css'],
})
export class SalesGoalDetailsComponent implements OnInit {
  public salesGoal: SalesGoal = {
    year: null,
    month: null,
    brand: '',
    seller: null,
    amount: null,
  };

  constructor(
    private route: ActivatedRoute,
    private salesGoalService: SalesGoalsService,
    private router: Router,
    private flashMessageService: FlashMessagesService
  ) {}

  ngOnInit(): void {
    // Get route id
    this.route.params.subscribe((params) => {
      const { id } = params;
      // Get sales goal
      this.salesGoalService
        .getSingleSalesGoal(id)
        .subscribe((salesGoal: SalesGoal) => {
          this.salesGoal = salesGoal;
        });
    });
  }

  public onDeleteClick(): void {
    if (confirm('Are you sure you want delete this sales goal?')) {
      // Remove sales goal
      this.salesGoalService.removeSalesGoal(this.salesGoal.id).then(() => {
        this.router.navigateByUrl('/');
        this.flashMessageService.show('Sales goal removed', {
          cssClass: 'alert alert-success',
        });
      });
    }
  }
}
