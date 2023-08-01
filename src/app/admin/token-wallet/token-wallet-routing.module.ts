import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokenWalletComponent } from './token-wallet.component';

const routes: Routes = [{ path: '', component: TokenWalletComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TokenWalletRoutingModule { }
