import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientareaComponent } from './clientarea.component';

const routes: Routes = [
  {
    path: '',
    component: ClientareaComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'invest',
        loadChildren: () => import('./invest/invest.module').then(m => m.InvestModule)
      },

      {
        path: 'investment-history',
        loadChildren: () => import('./investment-history/investment-history.module').then(m => m.InvestmentHistoryModule)
      },
      {
        path: 'referals',
        loadChildren: () => import('./ref/ref.module').then(m => m.RefModule)
      },

      {
        path: 'withdrawal-history',
        loadChildren: () => import('./withdrawal-history/withdrawal-history.module').then(m => m.WithdrawalHistoryModule)
      },

      {
        path: 'withdraw',
        loadChildren: () => import('./withdraw/withdraw.module').then(m => m.WithdrawModule)
      },
      {
        path : 'profile',
        loadChildren: () => import('./acc-settings/acc-settings.module').then(m => m.AccSettingsModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientareaRoutingModule { }
