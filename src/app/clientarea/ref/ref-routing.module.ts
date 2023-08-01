import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RefComponent } from './ref.component';

const routes: Routes = [{ path: '', component: RefComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefRoutingModule { }
