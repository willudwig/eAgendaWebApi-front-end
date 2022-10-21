import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DespesaService } from '../services/despesa.service';
import { ListarDespesaViewModel } from '../view-models/listar-despesa.view-model';

@Component({
  selector: 'app-listar-despesas',
  templateUrl: './listar-despesas.component.html',
  styles: [
  ]
})
export class ListarDespesasComponent implements OnInit {

  public despesas$: Observable<ListarDespesaViewModel[]>;

  constructor(private serviceDespesa: DespesaService) { }

  ngOnInit(): void {
    this.despesas$ = this.serviceDespesa.selecionarTodos();
  }

}
