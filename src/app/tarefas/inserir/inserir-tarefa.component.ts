import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TarefaService } from '../services/tarefa.service';
import { FormsTarefaViewModel, ItemTarefaViewModel } from '../view-models/forms-tarefa.view-model';
import { PrioridadeTarefaEnum } from '../view-models/prioridade-tarefa.enum';
import { StatusItemTarefa } from '../view-models/status-item-tarefa.enum';

@Component({
  selector: 'app-inserir-tarefa',
  templateUrl: './inserir-tarefa.component.html'
})
export class InserirTarefaComponent implements OnInit {

  public formTarefa: FormGroup;
  public formItens: FormGroup;
  public prioridades = Object.values(PrioridadeTarefaEnum)
    .filter(v => !Number.isFinite(v));

  public tarefaFormVM: FormsTarefaViewModel = new FormsTarefaViewModel();

  constructor(
    titulo: Title,
    private formBuilder: FormBuilder,
    private tarefaService: TarefaService,
    private router: Router
  ) {
    titulo.setTitle('Cadastrar Tarefa - e-Agenda');
  }

  ngOnInit(): void {

    this.formTarefa = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      prioridade: ['', [Validators.required]],
    });

    this.formItens = this.formBuilder.group({
      tituloItem: ['']
    });
  }

  get titulo() {
    return this.formTarefa.get('titulo');
  }

  get prioridade() {
    return this.formTarefa.get('prioridade');
  }

  get tituloItem() {
    return this.formItens.get('tituloItem');
  }

  public adicionarItem(): void {
    if (this.tituloItem) {
      let item = new ItemTarefaViewModel();
      item.titulo = this.tituloItem.value;
      item.status = StatusItemTarefa.Adicionado;

      this.tarefaFormVM.itens.push(item);

      this.formItens.reset();
    }
  }

  public removerItem(item: ItemTarefaViewModel): void {
    this.tarefaFormVM.itens.forEach((x, index) => {
      if (x === item)
        this.tarefaFormVM.itens.splice(index, 1);
    })
  }

  public gravar() {
    if (this.formTarefa.invalid) return;

    this.tarefaFormVM = Object.assign({}, this.tarefaFormVM, this.formTarefa.value);

    this.tarefaService.inserir(this.tarefaFormVM)
      .subscribe({
        next: (tarefaInserida) => this.processarSucesso(tarefaInserida),
        error: (erro) => this.processarFalha(erro)
      })
  }

  private processarSucesso(tarefa: FormsTarefaViewModel): void {
    this.router.navigate(['/tarefas/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      console.error(erro);
    }
  }
}
