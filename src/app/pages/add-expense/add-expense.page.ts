import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
})
export class AddExpensePage {
  description: string = '';
  amount: number | null = null;

  constructor(private router: Router) {}

  addExpense() {
    const newExpense = {
      description: this.description,
      amount: this.amount
    };

    let expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    this.router.navigateByUrl('/home');
  }
}
