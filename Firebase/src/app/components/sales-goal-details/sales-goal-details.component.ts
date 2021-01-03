import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesGoalsService } from '../../services/sales-goals.service';

import { SalesGoal } from '../../models/SalesGoal';

@Component({
  selector: 'app-sales-goal-details',
  templateUrl: './sales-goal-details.component.html',
  styleUrls: ['./sales-goal-details.component.css'],
})
export class SalesGoalDetailsComponent implements OnInit {
  public salesGoal: SalesGoal;

  constructor(
    private route: ActivatedRoute,
    private salesGoalService: SalesGoalsService
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
}
