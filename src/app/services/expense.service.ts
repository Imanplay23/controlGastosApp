import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses: any[] = [];
  private totalSpentSubject = new BehaviorSubject<number>(0);
  private budgetSubject = new BehaviorSubject<number>(0);
  private availableBalanceSubject = new BehaviorSubject<number>(0);

  totalSpent$ = this.totalSpentSubject.asObservable();
  budget$ = this.budgetSubject.asObservable();
  availableBalance$ = this.availableBalanceSubject.asObservable();

  constructor() {
    this.loadExpenses();
    this.calculateTotals();
  }

  private loadExpenses() {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    this.expenses = storedExpenses;
    this.calculateTotals();
  }

  private calculateTotals() {
    const totalSpent = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const budget = this.budgetSubject.value;
    const availableBalance = budget - totalSpent;

    this.totalSpentSubject.next(totalSpent);
    this.availableBalanceSubject.next(availableBalance);
  }

  getExpenses() {
    return this.expenses;
  }

  addExpense(expense: any) {
    this.expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
    this.calculateTotals();
  }

  deleteExpense(id: string) {
    this.expenses = this.expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
    this.calculateTotals();
  }

  setBudget(budget: number) {
    this.budgetSubject.next(budget);
    localStorage.setItem('budget', budget.toString());
    this.calculateTotals();
  }
}
