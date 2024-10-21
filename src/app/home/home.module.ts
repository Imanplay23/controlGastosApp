import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AddExpensePageModule } from '../pages/add-expense/add-expense.module';
import { ExpenseSummaryModule } from '../components/expense-summary/expense-summary.module';
import { ExpenseListPageModule } from "../pages/expense-list/expense-list.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    AddExpensePageModule,
    ExpenseSummaryModule,
    ExpenseListPageModule,
],
  declarations: [HomePage]
})
export class HomePageModule {}
