import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithdrawalHistoryComponent } from './withdrawal-history.component';

const routes: Routes = [{ path: '', component: WithdrawalHistoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawalHistoryRoutingModule { }
