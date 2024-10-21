import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.scss'],
})
export class ExpenseSummaryComponent implements OnInit {
  totalSpent: number = 0;
  budget: number = 0;
  availableBalance: number = 0;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.expenseService.totalSpent$.subscribe(total => {
      this.totalSpent = total;
    });

    this.expenseService.budget$.subscribe(budget => {
      this.budget = budget;
    });

    this.expenseService.availableBalance$.subscribe(balance => {
      this.availableBalance = balance;
    });
  }

  saveBudget() {
    this.expenseService.setBudget(this.budget);
  }
}
