import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BonusRoutingModule } from './bonus-routing.module';
import { BonusComponent } from './bonus.component';
import { FormsModule } from '@angular/forms';
import { MaterialsModule } from 'src/app/materials/materials.module';


@NgModule({
  declarations: [BonusComponent],
  imports: [
    CommonModule,
    BonusRoutingModule,
    MaterialsModule,
    FormsModule
  ]
})
export class BonusModule { }
