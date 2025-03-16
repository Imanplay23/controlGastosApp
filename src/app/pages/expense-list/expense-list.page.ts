import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { Expense } from 'src/app/interfaces/expense';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-expense-list',
    templateUrl: './expense-list.page.html',
    styleUrls: ['./expense-list.page.scss'],
    standalone: false,
})
export class ExpenseListPage implements OnInit {
  expenses: any[] = [];

  constructor(
    private expenseService: ExpenseService, 
    private navCtrl: NavController) {}

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
    this.navCtrl.navigateForward(['/add-expense', { expenseToEdit: JSON.stringify(expense) }]);
  }
}
