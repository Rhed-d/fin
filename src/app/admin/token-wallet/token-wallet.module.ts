import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenWalletRoutingModule } from './token-wallet-routing.module';
import { TokenWalletComponent } from './token-wallet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from 'src/app/materials/materials.module';


@NgModule({
  declarations: [TokenWalletComponent],
  imports: [
    CommonModule,
    TokenWalletRoutingModule,
    MaterialsModule,
    ReactiveFormsModule
  ]
})
export class TokenWalletModule { }
