import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from 'src/app/materials/materials.module';
import { SharedModule } from 'src/app/components/shared.module';
import { LottieModule } from  'ngx-lottie'

@NgModule({
  declarations: [
    UsersComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MaterialsModule,
    LottieModule
  ]
})
export class UsersModule { }
