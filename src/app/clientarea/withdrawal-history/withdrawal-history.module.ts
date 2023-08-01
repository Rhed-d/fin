import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithdrawalHistoryRoutingModule } from './withdrawal-history-routing.module';
import { WithdrawalHistoryComponent } from './withdrawal-history.component';
import { MaterialsModule } from 'src/app/materials/materials.module';


@NgModule({
  declarations: [
    WithdrawalHistoryComponent
  ],
  imports: [
    CommonModule,
    WithdrawalHistoryRoutingModule,
    MaterialsModule
  ]
})
export class WithdrawalHistoryModule { }
