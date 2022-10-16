import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompromissoService } from '../services/compromisso.service';
import { ListarCompromissoViewModel } from '../view-models/listar-compromisso.view-model';

@Component({
  selector: 'app-listar-compromisso',
  templateUrl: './listar-compromisso.component.html',
})
export class ListarCompromissoComponent implements OnInit {

  public compromissos$: Observable<ListarCompromissoViewModel[]>;

  constructor(private serviceCompromisso: CompromissoService) { }

  ngOnInit(): void {
    this.compromissos$ = this.serviceCompromisso.selecionarTodos();
  }

}
