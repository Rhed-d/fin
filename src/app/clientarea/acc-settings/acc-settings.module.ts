import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsModule } from 'src/app/materials/materials.module';
import { AccSettingsComponent } from './acc-settings.component';
import { AccSettingsRoutingModule } from './acc-settings-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccSettingsComponent
  ],
  imports: [
    CommonModule,
    AccSettingsRoutingModule,
    MaterialsModule,
    ReactiveFormsModule
  ]
})
export class  AccSettingsModule { }
