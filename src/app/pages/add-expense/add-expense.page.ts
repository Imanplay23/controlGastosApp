import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from 'src/app/interfaces/expense';
import { AlertController } from '@ionic/angular';

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

  constructor(private router: Router, private alertController: AlertController) {}

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
      description: this.description,
      amount: this.amount,
      date: this.date,
      category: this.category
    };

    let expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    this.router.navigateByUrl('/home');
  }
}
