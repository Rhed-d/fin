import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ClientareaRoutingModule } from './clientarea-routing.module';
import { ClientareaComponent } from './clientarea.component';
import { MaterialsModule } from '../materials/materials.module';
import { SharedModule } from '../components/shared.module';


@NgModule({
  declarations: [
    ClientareaComponent
  ],
  imports: [
    CommonModule,
    ClientareaRoutingModule,
    MaterialsModule,
    SharedModule
  ]
})
export class ClientareaModule { }
