import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { ContatoComponent } from './contato.component';
import { EditarContatoComponent } from './editar/editar-contato.component';
import { ExcluirContatoComponent } from './excluir/excluir-contato.component';
import { InserirContatoComponent } from './inserir/inserir-contato.component';
import { ListarContatoComponent } from './listar/listar-contato.component';
import { FormContatoResolver } from './services/form-contato.resolver';
import { VisualizarContatoResolver } from './services/visualizar-contato.resolver';

const routes: Routes = [
  {
    path: '',
    component: ContatoComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
      },
      {
        path: 'listar',
        component: ListarContatoComponent
      },
      {
        path: 'inserir',
        component: InserirContatoComponent
      },
      {
        path: 'editar/:id',
        component: EditarContatoComponent,
        resolve: { contato: FormContatoResolver }
      },
      {
        path: 'excluir/:id',
        component: ExcluirContatoComponent,
        resolve: { contato: VisualizarContatoResolver }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContatoRoutingModule { }
