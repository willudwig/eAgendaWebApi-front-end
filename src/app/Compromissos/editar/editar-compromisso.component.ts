import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompromissoService } from '../services/compromisso.service';
import { FormsCompromissoViewModel } from '../view-models/forms-compromisso.view-model';
import { TipoLocalizacaoCompromissoEnum } from '../view-models/tipo-localizacao-compromisso.enum';

@Component({
  selector: 'app-editar-compromisso',
  templateUrl: './editar-compromisso.component.html',
  styles: [
  ]
})
export class EditarCompromissoComponent implements OnInit {

  public formCompromisso: FormGroup;
  public compromissoFormVM: FormsCompromissoViewModel;
  public contatoNomes: string[];

  public tiposLocal = Object.values(TipoLocalizacaoCompromissoEnum)
        .filter((x) => !Number.isFinite(x));

  constructor(
      titulo: Title,
      private formBuilder: FormBuilder,
      private compromissoService: CompromissoService,
      private toastr: ToastrService,
      private route: ActivatedRoute,
      private router: Router,
    )
    {
      titulo.setTitle("Cadastrar compromisso - eAgenda");
      this.compromissoFormVM = new FormsCompromissoViewModel();
    }

  ngOnInit(): void {
    this.compromissoFormVM = this.route.snapshot.data['compromisso'];

    this.formCompromisso = this.formBuilder.group({
      assunto: ['', [Validators.required, Validators.minLength(3)]],
      local: ['', [Validators.required]],
      data: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: ['', [Validators.required]],
      tipoLocal:[''],
      contatoNome: ['']
    });

    this.formCompromisso.patchValue({
      id: this.compromissoFormVM.id,
      assunto: this.compromissoFormVM.assunto,
      local: this.compromissoFormVM.local,
      data: this.compromissoFormVM.data,
      horaInicio: this.compromissoFormVM.horaInicio,
      horaTermino: this.compromissoFormVM.horaTermino,
      tipoLocal: this.compromissoFormVM.tipoLocal,
      contatoNome: this.compromissoFormVM.contatoNome
    });
  }

  get assunto() {
    return this.formCompromisso.get('assunto');
  }

  get local() {
    return this.formCompromisso.get('local');
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

  get tipoLocal() {
    return this.formCompromisso.get('tipoLocal');
  }

  get contatoNome() {
    return this.formCompromisso.get('contatoNome');
  }

  public gravar(): void {

    if (this.formCompromisso.invalid) return;

    this.compromissoFormVM = Object.assign({}, this.compromissoFormVM, this.formCompromisso.value);

    this.compromissoService.editar(this.compromissoFormVM)
      .subscribe({
        next: (compromissoEditado) => this.processarSucesso(compromissoEditado),
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

}
