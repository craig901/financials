import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthorisedComponent} from "./shared/components/layouts/authorised/authorised.component";
import {AuthGuard} from "./shared/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  }, {
    path: 'auth',
    children: [ {
      path: '',
      loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthModule )
    } ]
  },
  {
    path: '',
    component: AuthorisedComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardModule )
      },
      {
        path: 'transactions',
        loadChildren: () => import('./pages/transactions/transactions.module').then( m => m.TransactionsModule )
      }
    ]
  }

];

@NgModule({
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

}
