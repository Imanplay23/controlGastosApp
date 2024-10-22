import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.scss'],
})
export class ExpenseSummaryComponent implements OnInit {
  totalSpent: number = 0;
  budget: any;
  availableBalance: number = 0;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
   this.expenseService.budget$.subscribe(budget => {
    this.budget = budget;
    this.updateAvailableBalance();
  });

  this.expenseService.expenses$.subscribe(expenses => {
    this.totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0);
    this.updateAvailableBalance();
  });
}

updateAvailableBalance() {
  this.availableBalance = this.budget - this.totalSpent;
}
  saveBudget() {
    this.expenseService.setBudget(this.budget);
  }
}
