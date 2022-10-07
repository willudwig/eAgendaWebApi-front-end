import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'conta/autenticar',
    pathMatch: 'full'
  },
  {
    path: 'conta/autenticar',
    component: LoginComponent
  },
  {
    path: 'conta/registrar',
    component: RegistroComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
    .then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
