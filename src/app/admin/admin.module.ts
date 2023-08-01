import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CreatePaymentComponent } from './create-payment/create-payment.component';
import { MaterialsModule } from '../materials/materials.module';




@NgModule({
  declarations: [AdminComponent, CreatePaymentComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialsModule
  ]
})
export class AdminModule { }
