import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestmentPackagesComponent } from './investment-packages.component';

const routes: Routes = [{ path: '', component: InvestmentPackagesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentPackagesRoutingModule { }
