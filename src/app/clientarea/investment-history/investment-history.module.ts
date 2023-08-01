import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentHistoryRoutingModule } from './investment-history-routing.module';
import { InvestmentHistoryComponent } from './investment-history.component';
import { MaterialsModule } from 'src/app/materials/materials.module';


@NgModule({
  declarations: [
    InvestmentHistoryComponent
  ],
  imports: [
    CommonModule,
    InvestmentHistoryRoutingModule,
    MaterialsModule
  ]
})
export class InvestmentHistoryModule { }
