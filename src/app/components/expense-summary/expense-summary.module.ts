import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseSummaryComponent } from './expense-summary.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddExpensePageModule } from 'src/app/pages/add-expense/add-expense.module';



@NgModule({
  declarations: [ExpenseSummaryComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddExpensePageModule,
  ],

  exports: [ExpenseSummaryComponent]
})
export class ExpenseSummaryModule { }
