import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
    selector: 'app-expense-summary',
    templateUrl: './expense-summary.component.html',
    styleUrls: ['./expense-summary.component.scss'],
    standalone: false
})
export class ExpenseSummaryComponent implements OnInit {
  totalSpent: number = 0;
  budget: number = 0;
  availableBalance: number = 0;
  newBudget?: number;

  constructor(private expenseService: ExpenseService,private router: Router) {}

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
    if (this.newBudget !== undefined) {
      this.expenseService.setBudget(this.newBudget);
      this.newBudget = undefined;
    }
  }

  updateCalculations() {
    this.totalSpent = this.expenseService.getAvailableBalance();
    this.availableBalance = (this.budget || 0) - this.totalSpent;
  }

  editBudget() {
    this.router.navigate(['/add-budget']);
  }

  deleteBudget() {
    this.expenseService.clearBudget();
    this.updateCalculations();
  }
}
