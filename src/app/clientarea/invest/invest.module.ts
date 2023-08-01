import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestRoutingModule } from './invest-routing.module';
import { InvestComponent } from './invest.component';
import { TypeComponent } from './type/type.component';
import { MaterialsModule } from 'src/app/materials/materials.module';
import { PackageCardsComponent } from 'src/app/components/package-cards/package-cards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QrCodeModule } from 'ng-qrcode';


@NgModule({
  declarations: [
    InvestComponent,
    TypeComponent,
    PackageCardsComponent
  ],
  imports: [
    CommonModule,
    InvestRoutingModule,
    MaterialsModule,
    ReactiveFormsModule,
    FormsModule,
    QrCodeModule
  ]
})
export class InvestModule { }
