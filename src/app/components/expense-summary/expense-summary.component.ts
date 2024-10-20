import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.scss'],
})
export class ExpenseSummaryComponent implements OnInit {
  expenses: any[] = [];

  ngOnInit() {
    this.loadExpenses();
  }

  loadExpenses() {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    this.expenses = storedExpenses;
  }
}
