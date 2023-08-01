import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestmentHistoryComponent } from './investment-history.component';

const routes: Routes = [{ path: '', component: InvestmentHistoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentHistoryRoutingModule { }
