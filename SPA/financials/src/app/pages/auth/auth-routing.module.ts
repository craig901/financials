import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}];
// }, {
//   path: 'request-password',
//   component: RequestPasswordComponent
// }, {
//   path: 'set-password/:token',
//   component: SetPasswordComponent
// }, {
//   path: 'forgot',
//   component: ForgotComponent
// }, {
//   path: 'reset/:token',
//   component: ResetComponent
// } , {
//   path: 'sso/:token',
//   component: SSOComponent
// } , {
//   path: 'sso',
//   component: SSOComponent
// }, {
//   path: 'register/:token',
//   component: RegisterComponent
// } ];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class AuthRoutingModule {
}
