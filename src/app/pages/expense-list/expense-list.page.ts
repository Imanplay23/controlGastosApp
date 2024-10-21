import { Component, OnInit } from '@angular/core';
import { ExpenseSummaryComponent } from 'src/app/components/expense-summary/expense-summary.component';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.page.html',
  styleUrls: ['./expense-list.page.scss'],
})
export class ExpenseListPage implements OnInit {
  expenses: any[] = [];

  constructor( private summaryComponent: ExpenseSummaryComponent){}

  ngOnInit() {
    this.loadExpenses();
  }

  loadExpenses() {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    this.expenses = storedExpenses;
  }

  deleteExpense(id: string) {
    this.expenses = this.expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(this.expenses));

    this.summaryComponent.refreshData();
  }
}

