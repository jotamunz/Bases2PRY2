import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddSalesGoalComponent } from './components/add-sales-goal/add-sales-goal.component';
import { SalesGoalDetailsComponent } from './components/sales-goal-details/sales-goal-details.component';
import { EditSalesGoalComponent } from './components/edit-sales-goal/edit-sales-goal.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'salesGoals/add', component: AddSalesGoalComponent },
  { path: 'salesGoals/:id', component: SalesGoalDetailsComponent },
  { path: 'salesGoals/:id/edit', component: EditSalesGoalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
