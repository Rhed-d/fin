import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestComponent } from './invest.component';
import { TypeComponent } from './type/type.component';

const routes: Routes = [
  {
    path: '',
    component: InvestComponent,
  },
  {
    path: ':type',
    component: TypeComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestRoutingModule { }
