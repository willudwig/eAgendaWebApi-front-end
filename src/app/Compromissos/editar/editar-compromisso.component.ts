import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ContatoService } from 'src/app/contatos/services/contato.service';
import { ListarContatoViewModel } from 'src/app/contatos/view-models/listar-contato.view-model';
import { CompromissoService } from '../services/compromisso.service';
import { FormsCompromissoViewModel } from '../view-models/forms-compromisso.view-model';
import { TipoLocalizacaoCompromissoEnum } from '../view-models/tipo-localizacao-compromisso.enum';

@Component({
  selector: 'app-editar-compromisso',
  templateUrl: './editar-compromisso.component.html',
})
export class EditarCompromissoComponent implements OnInit {

  public formCompromisso: FormGroup;
  public formGroupContato: FormGroup;
  public compromissoFormVM: FormsCompromissoViewModel;

  public tiposLocal = Object.values(TipoLocalizacaoCompromissoEnum)
  .filter(v => !Number.isFinite(v));

  public contatoNomes: ListarContatoViewModel[];
  public contatos: Observable<ListarContatoViewModel[]>;

  constructor(
      titulo: Title,
      private formBuilder: FormBuilder,
      private compromissoService: CompromissoService,
      private toastr: ToastrService,
      private route: ActivatedRoute,
      private router: Router,
      private contatoService: ContatoService
    )
    {
      titulo.setTitle("Editar Compromisso - eAgenda");

      this.compromissoFormVM = new FormsCompromissoViewModel();
    }

  ngOnInit(): void {
    this.compromissoFormVM = this.route.snapshot.data['compromisso'];
    console.log(this.compromissoFormVM);
    this.formCompromisso = this.formBuilder.group({
      assunto: ['', [Validators.required, Validators.minLength(3)]],
      local: ['', [Validators.required]],
      tipoLocal: ['', [Validators.required]],
      link: ['www.nulo.com'],
      data: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: [''],
      contatoId: [''],
    });

    this.formCompromisso.patchValue({
      id: this.compromissoFormVM.id,
      assunto: this.compromissoFormVM.assunto,
      local: this.compromissoFormVM.local,
      tipoLocal: this.compromissoFormVM.tipoLocal,
      link: this.compromissoFormVM.link,
      data: this.compromissoFormVM.data.toString().split('T')[0],
      horaInicio: this.compromissoFormVM.horaInicio,
      horaTermino: this.compromissoFormVM.horaTermino,
      contatoId: this.compromissoFormVM.contatoId,
    });

    this.obterNomesContatos();
  }

  get assunto() {
    return this.formCompromisso.get('assunto');
  }

  get local() {
    return this.formCompromisso.get('local');
  }

  get tipoLocal() {
    return this.formCompromisso.get('tipoLocal');
  }

  get data() {
    return this.formCompromisso.get('data');
  }

  get horaInicio() {
    return this.formCompromisso.get('horaInicio');
  }

  get horaTermino() {
    return this.formCompromisso.get('horaTermino');
  }

  get contatoId() {
    return this.formCompromisso.get('contatoId');
  }

  get contato() {
    return this.formGroupContato.get('contato');
  }

  public gravar(): void {

    if (this.formCompromisso.invalid) return;

    this.compromissoFormVM = Object.assign({}, this.compromissoFormVM, this.formCompromisso.value);

    this.compromissoService.editar(this.compromissoFormVM)
    .subscribe({
      next: (CompromissoEditado) => this.processarSucesso(CompromissoEditado),
      error: (erro) => this.processarFalha(erro)
    });

  }

  private processarSucesso(compromisso: FormsCompromissoViewModel): void {
    this.toastr.success('Operação bem sucedida!', 'Sucesso');
    this.router.navigate(['/compromissos/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.toastr.error('Operação mal sucedida!', 'Fracasso');
      console.error(erro);
    }
  }

  private obterNomesContatos(): void  {
    this.contatos = this.contatoService.selecionarTodos();
    this.contatos.forEach((x) => {
      this.contatoNomes = x;
    });
  };

}
