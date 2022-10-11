import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatoRoutingModule } from './contato-routing.module';
import { ListarContatoComponent } from './listar/listar-contato.component';
import { InserirContatoComponent } from './inserir/inserir-contato.component';
import { EditarContatoComponent } from './editar/editar-contato.component';
import { ExcluirContatoComponent } from './excluir/excluir-contato.component';


@NgModule({
  declarations: [
    ListarContatoComponent,
    InserirContatoComponent,
    EditarContatoComponent,
    ExcluirContatoComponent
  ],
  imports: [
    CommonModule,
    ContatoRoutingModule
  ]
})
export class ContatoModule { }
