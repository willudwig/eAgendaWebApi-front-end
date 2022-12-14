import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { AuthGuard } from './auth/services/auth.guard';
import { LoginGuard } from './auth/services/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo:'conta/autenticar',
    pathMatch: 'full'
  },
  {
    path: 'conta/autenticar',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'conta/registrar',
    component: RegistroComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
    .then(m => m.DashboardModule),

    canActivate: [AuthGuard]
  },
  {
    path: 'tarefas',
    loadChildren: () => import('./tarefas/tarefa.module')
    .then(m => m.TarefaModule),

    //canActivate: [AuthGuard] criado dentro do tarefa-routing.module
  },
  {
    path: 'contatos',
    loadChildren: () => import('./contatos/contato.module')
    .then(m => m.ContatoModule),

    //canActivate: [AuthGuard] criado dentro do contato-routing.module
  },
  {
    path: 'compromissos',
    loadChildren: () => import('./Compromissos/compromisso.module')
    .then(m => m.CompromissoModule),

    //canActivate: [AuthGuard] criado dentro do compromisso-routing.module
  },
  {
    path: 'despesas',
    loadChildren: () => import('./despesas/depesa.module')
    .then(m => m.DepesaModule),

    //canActivate: [AuthGuard] criado dentro do compromisso-routing.module
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
