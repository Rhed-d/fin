import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefRoutingModule } from './ref-routing.module';
import { RefComponent } from './ref.component';
import { MaterialsModule } from 'src/app/materials/materials.module';


@NgModule({
  declarations: [
    RefComponent
  ],
  imports: [
    CommonModule,
    RefRoutingModule,
    MaterialsModule
  ]
})
export class RefModule { }
