import { Component } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-budget',
    templateUrl: './add-budget.page.html',
    styleUrls: ['./add-budget.page.scss'],
    standalone: false
})
export class AddBudgetPage {
  newBudget: number | null = null;

  constructor(private expenseService: ExpenseService, private router: Router) {}

  saveBudget() {
    if (this.newBudget) {
      this.expenseService.setBudget(this.newBudget);
      this.router.navigate(['/home']);
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
