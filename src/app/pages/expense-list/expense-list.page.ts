import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.page.html',
  styleUrls: ['./expense-list.page.scss'],
})
export class ExpenseListPage implements OnInit {
  expenses: any[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.expenses = this.expenseService.getExpenses();
  }

  deleteExpense(id: string) {
    this.expenseService.deleteExpense(id);
    this.expenses = this.expenseService.getExpenses();
  }
}
