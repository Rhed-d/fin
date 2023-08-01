import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from 'src/app/materials/materials.module';


@NgModule({
  declarations: [DashBoardComponent],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashBoardModule { }
