import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreatePaymentComponent } from './create-payment/create-payment.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
    },
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./dash-board/dash-board.module').then(m => m.DashBoardModule)
            },
            {
                path: 'members',
                loadChildren: () => import('./members/members.module').then(m => m.MembersModule)
            },
            {
                path: 'pendings',
                loadChildren: () => import('./pending/pending.module').then(m => m.PendingModule)
            },

            {
                path: 'investments',
                loadChildren: () => import('./investments/investments.module').then(m => m.InvestmentsModule)
            },

            {
                path: 'createUser', loadChildren: () => import('./create-user/create-user.module').then(m => m.CreateUserModule)
            },
            {
                path: 'bonus',
                loadChildren: () => import('./bonus/bonus.module').then(m => m.BonusModule)
            },
            {
                path: 'token_wallet',
                loadChildren: () => import('./token-wallet/token-wallet.module').then(m => m.TokenWalletModule)
            },
            {
                path: 'investment_packages',
                loadChildren: () => import('./investment-packages/investment-packages.module').then(m => m.InvestmentPackagesModule)
            },
            {
                path : 'generate-mail',
                component: CreatePaymentComponent
            }
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
