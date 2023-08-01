import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentsRoutingModule } from './investments-routing.module';
import { InvestmentsComponent } from './investments.component';
import { MaterialsModule } from 'src/app/materials/materials.module';


@NgModule({
  declarations: [InvestmentsComponent],
  imports: [
    CommonModule,
    InvestmentsRoutingModule,
    MaterialsModule
  ]
})
export class InvestmentsModule { }
