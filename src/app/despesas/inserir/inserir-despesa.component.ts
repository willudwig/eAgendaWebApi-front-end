import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DespesaService } from '../services/despesa.service';
import { CategoriaSelecionadaViewModel } from '../view-models/categoria-selecionada.viewmodel';
import { FormaPgtoDespesaEnum } from '../view-models/formapgtodespesaenum';
import { FormsDespesaViewModel } from '../view-models/forms-despesa.view-model';

@Component({
  selector: 'app-inserir-despesa',
  templateUrl: './inserir-despesa.component.html',
  styles: [
  ]
})
export class InserirDespesaComponent implements OnInit {

  public formDespesa: FormGroup;
  public formCategorias: FormGroup;
  public despesaFormVM: FormsDespesaViewModel;

  public formasPagamento = Object.values(FormaPgtoDespesaEnum)
  .filter(v => !Number.isFinite(v));

  constructor(

    titulo: Title,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private despesaService: DespesaService

    ) {
      titulo.setTitle("Cadastrar Despesas - eAgenda");

      this.despesaFormVM = new FormsDespesaViewModel();

    }

  ngOnInit(): void {

    this.formDespesa = this.formBuilder.group({
      id: [''],
      descricao: ['', [Validators.required, Validators.minLength(3)] ],
      valor: ['', [Validators.required]],
      data: ['', Validators.required],
      formaPagamento: [''],

      categoriasSelecionadas: ['']
    })

    this.formCategorias = this.formBuilder.group({
      titulo: ['']
    });

  }

  get id() {
    return this.formDespesa.get('id');
  }

  get descricao() {
    return this.formDespesa.get('descricao');
  }

  get valor() {
    return this.formDespesa.get('valor');
  }

  get data() {
    return this.formDespesa.get('data');
  }

  get formaPagamento() {
    return this.formDespesa.get('formaPagamento');
  }

  get titulo() {
    return this.formCategorias.get('titulo');
  }

  public gravar(): void {

    if (this.formDespesa.invalid) return;

    this.despesaFormVM = Object.assign({}, this.despesaFormVM, this.formDespesa.value);

    this.despesaService.inserir(this.despesaFormVM)
    .subscribe({
      next: (despesaInserida) => this.processarSucesso(despesaInserida),
      error: (erro) => this.processarFalha(erro)
    });
  }

  private processarSucesso(despesa: FormsDespesaViewModel): void {
    this.toastr.success('Operação bem sucedida!', 'Sucesso');
    this.router.navigate(['/despesas/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.toastr.error('Operação mal sucedida!', 'Fracasso');
      console.error(erro);
    }
  }

  public adicionarCategoria() {

    if (this.titulo) {

      let categoria = new CategoriaSelecionadaViewModel();
      categoria.titulo = this.titulo.value;

      if (Array.isArray(this.despesaFormVM.categoriasSelecionadas))
          this.despesaFormVM.categoriasSelecionadas.push(categoria);

      this.formCategorias.reset();
   }
  }
}

