import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddSalesGoalComponent } from './components/add-sales-goal/add-sales-goal.component';
import { SalesGoalDetailsComponent } from './components/sales-goal-details/sales-goal-details.component';
import { EditSalesGoalComponent } from './components/edit-sales-goal/edit-sales-goal.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'salesGoals/add', component: AddSalesGoalComponent },
  { path: 'salesGoals/:id', component: SalesGoalDetailsComponent },
  { path: 'salesGoals/:id/edit', component: EditSalesGoalComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
