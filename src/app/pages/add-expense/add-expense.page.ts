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
  amount: number | null = null;
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

  addExpense() {
    if (this.isEditing) {
      this.expenseService.updateExpense(this.expense);
    } else {
      this.expense.id = this.generateUniqueId();
      this.expenseService.addExpense(this.expense);
    }
    
    this.router.navigate(['/home']);
  }

  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
