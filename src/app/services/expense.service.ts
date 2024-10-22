import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense } from '../interfaces/expense';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expenses: Expense[] = [];
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  expenses$ = this.expensesSubject.asObservable();

  private budget: number = 0;
  private budgetSubject = new BehaviorSubject<number>(0);
  budget$ = this.budgetSubject.asObservable();

  constructor() {
    this.loadExpenses();
    this.loadBudget();
  }

  loadExpenses() {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      this.expenses = JSON.parse(storedExpenses);
      this.expensesSubject.next(this.expenses);
    }
  }

  loadBudget() {
    const storedBudget = localStorage.getItem('budget');
    if (storedBudget) {
      this.budget = parseFloat(storedBudget);
      this.budgetSubject.next(this.budget);
    }
  }

  setBudget(amount: number) {
    this.budget = amount;
    this.budgetSubject.next(this.budget);
    localStorage.setItem('budget', amount.toString());
  }

  addExpense(expense: Expense) {
    this.expenses.push(expense);
    this.expensesSubject.next(this.expenses);
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  removeExpense(id: string) {
    this.expenses = this.expenses.filter(exp => exp.id !== id);
    this.expensesSubject.next(this.expenses);
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  getAvailableBalance(): number {
    const totalSpent = this.expenses.reduce((acc, expense) => acc + expense.amount, 0);
    return this.budget - totalSpent;
  }
}
