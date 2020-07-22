import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutController } from './logout/logout.controller';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    data: { title: 'ABOUT.TITLE' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'AUTH.LOGIN.TITLE' },
  },
  {
    path: 'logout',
    component: LogoutController,
    data: { title: 'AUTH.LOGOUT.TITLE' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'AUTH.REGISTER.TITLE' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StimFeatureAuthFeatureRoutingModule {}
