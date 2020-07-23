import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutController } from './logout/logout.controller';
import { LoginGuard } from './login/login.guard';
import { AuthGuard } from './auth.guard';
import { LogoutGuard } from './logout/logout.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    data: { title: 'ABOUT.TITLE' },
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'AUTH.LOGIN.TITLE' },
    canActivate: [LoginGuard],
  },
  {
    path: 'logout',
    component: LogoutController,
    data: { title: 'AUTH.LOGOUT.TITLE' },
    canActivate: [LogoutGuard],
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
