import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithdrawRoutingModule } from './withdraw-routing.module';
import { WithdrawComponent } from './withdraw.component';
import { MaterialsModule } from 'src/app/materials/materials.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WithdrawComponent
  ],
  imports: [
    CommonModule,
    WithdrawRoutingModule,
    MaterialsModule,
    FormsModule
  ]
})
export class WithdrawModule { }
