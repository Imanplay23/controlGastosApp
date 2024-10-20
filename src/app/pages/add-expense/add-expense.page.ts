import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from 'src/app/interfaces/expense';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
})
export class AddExpensePage {
  description: string = '';
  amount: number = 0;

  constructor(private router: Router) {}

  addExpense() {
    const newExpense: Expense = {
      description: this.description,
      amount: this.amount
    };


    if (!this.description || this.amount === null || this.amount <= 0) {
      alert('Por favor, ingresa una descripción y un monto válido.');
      return;
    }

    let expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    this.router.navigateByUrl('/home');
  }
}
