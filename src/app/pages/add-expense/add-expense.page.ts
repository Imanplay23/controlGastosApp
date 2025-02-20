import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/interfaces/expense';
import { AlertController } from '@ionic/angular';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
})
export class AddExpensePage implements OnInit {
  description: string = '';
  amount?: number;
  date: string = '';
  category: string = '';
  expense: Expense = { id: '', description: '', amount: 0, date: new Date().toISOString(), category: '' };
  isEditing: boolean = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    const expenseToEdit = this.route.snapshot.paramMap.get('expenseToEdit');
    if (expenseToEdit) {
      this.expense = JSON.parse(expenseToEdit);
      this.isEditing = true;
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Campos obligatorios',
      message: 'Rellene todos los campos.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async addExpense() {
    if (!this.expenseService.getBudget()) {
      const alert = await this.alertController.create({
        header: 'Presupuesto Requerido',
        message: 'Debes agregar un presupuesto antes de añadir un gasto.',
        buttons: [
          {
            text: 'Establecer Presupuesto',
            handler: () => {
              this.router.navigate(['/add-budget']);
            },
          },
        ],
      });
  
      await alert.present();
    } else {
      if (!this.validateForm()) {
        await this.presentAlert();
        return;
      }

      if (this.isEditing) {
        this.updateExistingExpense();
      } else {
        this.createNewExpense();
      }

      this.router.navigate(['/home']);
    }
  }

  private validateForm(): boolean {
    return !!this.expense.description && 
           !!this.expense.amount && 
           !!this.expense.category && 
           !!this.expense.date;
  }

  private createNewExpense() {
    const newExpense: Expense = {
      ...this.expense,
      id: this.generateUniqueId(),
      date: new Date(this.expense.date).toISOString()
    };
    this.expenseService.addExpense(newExpense);
  }

  private updateExistingExpense() {
    const updatedExpense: Expense = {
      ...this.expense,
      date: new Date(this.expense.date).toISOString()
    };
    this.expenseService.updateExpense(updatedExpense);
  }

  private generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}