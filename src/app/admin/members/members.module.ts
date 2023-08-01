import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { FormsModule } from '@angular/forms';
import { MemberComponent } from './member/member.component';
import { MaterialsModule } from 'src/app/materials/materials.module';


@NgModule({
  declarations: [MembersComponent, MemberComponent],
  imports: [
    CommonModule,
    MembersRoutingModule,
    MaterialsModule,
    FormsModule,
  ]
})
export class MembersModule { }
