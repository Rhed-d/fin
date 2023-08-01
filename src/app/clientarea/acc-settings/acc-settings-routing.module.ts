import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccSettingsComponent } from './acc-settings.component';

const routes: Routes = [{ path: '', component: AccSettingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccSettingsRoutingModule { }
