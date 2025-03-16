import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { Router } from '@angular/router';
import { Expense } from 'src/app/interfaces/expense';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.page.html',
  styleUrls: ['./expense-list.page.scss'],
})
export class ExpenseListPage implements OnInit {
  expenses: any[] = [];

  constructor(private expenseService: ExpenseService, private router: Router) {}

  ngOnInit() {
    this.expenseService.expenses$.subscribe(expenses => {
      this.expenses = expenses;
    });
  }

  deleteExpense(id: string) {
    this.expenseService.deleteExpense(id);
    this.expenses = this.expenseService.getExpenses();
  }

  editExpense(expense: Expense) {
    this.router.navigate(['/add-expense', { expenseToEdit: JSON.stringify(expense) }]);
  }
}
