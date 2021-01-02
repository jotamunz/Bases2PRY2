import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddSalesGoalComponent } from './components/add-sales-goal/add-sales-goal.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'salesGoals/add', component: AddSalesGoalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
