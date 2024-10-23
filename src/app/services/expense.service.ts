import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense } from '../interfaces/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses: Expense[] = [];
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  expenses$ = this.expensesSubject.asObservable();
  private totalSpentSubject = new BehaviorSubject<number>(0);
  private budgetSubject = new BehaviorSubject<number>(0);
  private availableBalanceSubject = new BehaviorSubject<number>(0);

  private budget: number = 0;
  totalSpent$ = this.totalSpentSubject.asObservable();
  budget$ = this.budgetSubject.asObservable();
  availableBalance$ = this.availableBalanceSubject.asObservable();

  constructor() {
    this.loadExpenses();
    this.loadBudget();
  }

  private loadExpenses() {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      this.expenses = JSON.parse(storedExpenses);
      this.expensesSubject.next(this.expenses);
    }
  }

  loadBudget(){
    const storedBudget = localStorage.getItem('budget');
    if (storedBudget) {
      this.budget = parseFloat(storedBudget);
      this.budgetSubject.next(this.budget);
    }
  }

  // private calculateTotals() {
  //   const totalSpent = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  //   const budget = this.budgetSubject.value;
  //   const availableBalance = budget - totalSpent;

  //   this.totalSpentSubject.next(totalSpent);
  //   this.availableBalanceSubject.next(availableBalance);
  // }

  getExpenses() {
    return this.expenses;
  }

  addExpense(expense: any) {
    this.expenses.push(expense);
    this.expensesSubject.next(this.expenses);
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  updateExpense(updatedExpense: Expense) {
    const index = this.expenses.findIndex(exp => exp.id === updatedExpense.id);
    if (index !== -1) {
      this.expenses[index] = updatedExpense;
      this.expensesSubject.next(this.expenses);
    }
  }

  deleteExpense(id: string) {
    this.expenses = this.expenses.filter(exp => exp.id !== id);
    this.expensesSubject.next(this.expenses);
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  setBudget(amount: number) {
    this.budget = amount;
    this.budgetSubject.next(this.budget);
    localStorage.setItem('budget', amount.toString());
  }

  getAvailableBalance(): number {
    const totalSpent = this.expenses.reduce((acc, expense) => acc + expense.amount, 0);
    return this.budget - totalSpent;
  }
}
