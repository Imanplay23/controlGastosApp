import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from 'src/app/interfaces/expense';
import { AlertController } from '@ionic/angular';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
})
export class AddExpensePage {
  description: string = '';
  amount: number | null = null;
  date: string = '';
  category: string = '';

  constructor(
    private router: Router, 
    private expenseService: ExpenseService,
    private alertController: AlertController
  ) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Campos obligatorios',
      message: 'Rellene todos los campos.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  addExpense() {
    if (!this.description || this.amount === null || this.amount <= 0 || !this.date || !this.category) {
      this.presentAlert()
      return;
    }

    const newExpense: Expense = {
      id: this.generateUniqueId(),
      description: this.description,
      amount: this.amount,
      date: this.date,
      category: this.category
    };

    this.expenseService.addExpense(newExpense);
    this.router.navigateByUrl('/home');
  }

  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
