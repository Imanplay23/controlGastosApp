import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AddExpensePage } from '../pages/add-expense/add-expense.page';
import { AddExpensePageModule } from '../pages/add-expense/add-expense.module';
import { ExpenseSummaryModule } from '../components/expense-summary/expense-summary.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    AddExpensePageModule,
    ExpenseSummaryModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
