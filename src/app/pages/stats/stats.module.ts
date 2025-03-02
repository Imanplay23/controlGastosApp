import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatsPageRoutingModule } from './stats-routing.module';

import { StatsPage } from './stats.page';
import { ExpenseSummaryModule } from 'src/app/components/expense-summary/expense-summary.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatsPageRoutingModule,
    ExpenseSummaryModule
  ],
  declarations: [StatsPage]
})
export class StatsPageModule {}
