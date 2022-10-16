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


@NgModule({
  declarations: [
    CompromissoComponent,
    ListarCompromissoComponent
  ],
  imports: [
    CommonModule,
    CompromissoRoutingModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers:[
    CompromissoService,
    FormsCompromissoResolver,
    VisualizarCompromissoResolver
  ]
})
export class CompromissoModule { }
