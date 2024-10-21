import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.scss'],
})
export class ExpenseSummaryComponent implements OnInit {
  expenses: any[] = [];
  totalSpent: number = 0;
  budget: number = 1000;
  availableBalance: number = 0;

  ngOnInit() {
    this.loadBudget();
    this.loadExpenses();
    this.calculateTotals();
  }

  loadBudget() {
    const storedBudget = localStorage.getItem('budget');
    this.budget = storedBudget ? parseFloat(storedBudget) : 1000;
  }

  saveBudget() {
    localStorage.setItem('budget', this.budget.toString());
    this.calculateTotals();
  }

  loadExpenses() {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    this.expenses = storedExpenses;
    this.calculateTotals();
  }

  calculateTotals() {
    this.totalSpent = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    this.availableBalance = this.budget - this.totalSpent;
  }

  refreshData() {
    this.loadExpenses();
    this.calculateTotals();
  }
}
