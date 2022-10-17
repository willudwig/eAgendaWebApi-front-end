import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompromissoRoutingModule } from './compromisso-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { CompromissoService } from './services/compromisso.service';
import { FormsCompromissoResolver } from './services/forms.compromisso.resolver';
import { VisualizarCompromissoResolver } from './services/visualizar-compromisso.resolver';
import { CompromissoComponent } from './compromisso.component';
import { ListarCompromissoComponent } from './listar/listar-compromisso.component';
import { InserirCompromissoComponent } from './inserir/inserir-compromisso.component';
import { EditarCompromissoComponent } from './editar/editar-compromisso.component';
import { ExcluirCompromissoComponent } from './excluir/excluir-compromisso.component';
import { ContatoService } from '../contatos/services/contato.service';


@NgModule({
  declarations: [
    CompromissoComponent,
    ListarCompromissoComponent,
    InserirCompromissoComponent,
    EditarCompromissoComponent,
    ExcluirCompromissoComponent
  ],
  imports: [
    CommonModule,
    CompromissoRoutingModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers:[
    CompromissoService,
    ContatoService,
    FormsCompromissoResolver,
    VisualizarCompromissoResolver
  ]
})
export class CompromissoModule { }
