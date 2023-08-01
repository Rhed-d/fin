import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentPackagesRoutingModule } from './investment-packages-routing.module';
import { InvestmentPackagesComponent } from './investment-packages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from 'src/app/materials/materials.module';


@NgModule({
  declarations: [InvestmentPackagesComponent],
  imports: [
    CommonModule,
    InvestmentPackagesRoutingModule,
    MaterialsModule,
    ReactiveFormsModule
  ]
})
export class InvestmentPackagesModule { }
