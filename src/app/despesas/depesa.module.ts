import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepesaRoutingModule } from './depesa-routing.module';
import { DespesaComponent } from './despesa.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { InserirDespesaComponent } from './inserir/inserir-despesa.component';
import { EditarDespesaComponent } from './editar/editar-despesa.component';
import { ListarDespesasComponent } from './listar/listar-despesas.component';
import { ExcluirDespesaComponent } from './excluir/excluir-despesa.component';
import { DespesaService } from './services/despesa.service';


@NgModule({
  declarations: [
    DespesaComponent,
    InserirDespesaComponent,
    EditarDespesaComponent,
    ExcluirDespesaComponent,
    ListarDespesasComponent
  ],
  imports: [
    CommonModule,
    DepesaRoutingModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [
    DespesaService
  ]
})
export class DepesaModule { }
