import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from '../services/expense.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  budget: number | null = null;

  constructor(
    private router: Router,
    private expenseService: ExpenseService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.checkBudget();
  }

  checkBudget() {
    this.expenseService.budget$.subscribe((budget) => {
      this.budget = budget;
      if (!this.budget || this.budget <= 0) {
        this.showBudgetAlert();
      }
    });
  }

  async showBudgetAlert() {
    const alert = await this.alertController.create({
      header: 'Presupuesto no establecido',
      message: 'Debes establecer un presupuesto antes de agregar gastos.',
      buttons: [
        {
          text: 'Establecer Presupuesto',
          handler: () => {
            this.router.navigateByUrl('/home');
          },
        },
      ],
      backdropDismiss: false,
    });

    await alert.present();
  }
}
