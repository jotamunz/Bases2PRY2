import { Component, OnInit } from '@angular/core';
import { SalesGoalsService } from '../../services/sales-goals.service';

import { SalesGoal } from '../../models/SalesGoal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public salesGoals: SalesGoal[];
  public isLoading: boolean = true;

  constructor(private salesGoalsService: SalesGoalsService) {}

  ngOnInit(): void {
    // Get sales goals
    this.salesGoalsService
      .getSalesGoals()
      .subscribe((salesGoals: SalesGoal[]) => {
        this.salesGoals = salesGoals;
        this.isLoading = false;
      });
  }
}
