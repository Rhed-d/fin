import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingRoutingModule } from './pending-routing.module';
import { PendingComponent } from './pending.component';
import { MaterialsModule } from 'src/app/materials/materials.module';



@NgModule({
  declarations: [PendingComponent],
  imports: [
    CommonModule,
    PendingRoutingModule,
    MaterialsModule
  ]
})
export class PendingModule { }
