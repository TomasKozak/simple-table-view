import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginViewComponent } from './components/login-view/login-view.component';
import { TableBaseComponent } from './components/table-base/table-base.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginViewComponent },
  { path: 'index', component: TableBaseComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/index'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
