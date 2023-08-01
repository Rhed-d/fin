import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGaurdService } from './services/admin-auth-gaurd.service';
import { AuthAurdService } from './services/auth-aurd.service';
import { LoginGaurdService } from './services/login-gaurd.service';

const routes: Routes = [
  {
    path: 'adminbackend',
    pathMatch: 'full',
    redirectTo: 'adminbackend/dashboard',
  },
  {
    path: 'adminbackend',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminAuthGaurdService],
  },
  {
    path: '',
    loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'clientarea',
    loadChildren: () => import('./clientarea/clientarea.module').then(m => m.ClientareaModule),
    canActivate: [AuthAurdService]
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
    canActivate: [LoginGaurdService]
  },
  {
    path:
      'contact_us',
    loadChildren: () => import('./pages/contact-us/contact-us.module').then(m => m.ContactUsModule)
  },
  {
    path:
      'faqs',
    loadChildren: () => import('./pages/faqs/faqs.module').then(m => m.FaqsModule)
  },
  {
    path: 'Privacy_Policy',
    loadChildren: () => import('./pages/terms/terms.module').then(m => m.TermsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
