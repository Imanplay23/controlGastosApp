import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'add-expense',
    loadChildren: () => import('./pages/add-expense/add-expense.module').then( m => m.AddExpensePageModule)
  },
  {
    path: 'expense-list',
    loadChildren: () => import('./pages/expense-list/expense-list.module').then( m => m.ExpenseListPageModule)
  },
  {
    path: 'add-budget',
    loadChildren: () => import('./pages/add-budget/add-budget.module').then( m => m.AddBudgetPageModule)
  },
  {
    path: 'stats',
    loadChildren: () => import('./pages/stats/stats.module').then( m => m.StatsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
