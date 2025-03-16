import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from '../services/expense.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: false
})
export class HomePage implements OnInit {
  budget: number | null = null;

  constructor(
    private navCtrl : NavController,
    private expenseService: ExpenseService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.expenseService.budget$.subscribe(budget => {
      this.budget = budget;
    });
  }

  async onAddExpense() {
    if (!this.budget || this.budget <= 0) {
      await this.checkBudget();
      return;
    }

    this.navCtrl.navigateForward('/add-expense');
  }

  async checkBudget() {
    if (!this.expenseService.getBudget()) {
      const alert = await this.alertController.create({
        header: 'Presupuesto Requerido',
        message: 'Debes establecer un presupuesto antes de agregar gastos.',
        buttons: [
          {
            text: 'Establecer Presupuesto',
            handler: () => {
              this.navCtrl.navigateForward(['/add-budget']);
            },
          },
          {
            text: 'Continuar',
            role: 'cancel',
          },
        ],
      });

      await alert.present();
    }
  }

  addBudget(){
    this.navCtrl.navigateForward('/add-budget')
  }

  goToStats(){
    this.navCtrl.navigateForward('/stats')
  }
}
