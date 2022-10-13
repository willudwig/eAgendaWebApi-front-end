import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContatoService } from '../services/contato.service';
import { FormsContatoViewModel } from '../view-models/forms-contato.view-model';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styles: [
  ]
})
export class EditarContatoComponent implements OnInit {

  public formContato: FormGroup;
  public contatoFormVM: FormsContatoViewModel;

  constructor(
      titulo: Title,
      private formBuilder: FormBuilder,
      private contatoService: ContatoService,
      private toastr: ToastrService,
      private router: Router,
    )
    {
      titulo.setTitle("Cadastrar Contato - eAgenda");
      this.contatoFormVM = new FormsContatoViewModel();
    }

  ngOnInit(): void {
    this.formContato = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      empresa: ['', [Validators.required]],
      cargo: ['', [Validators.required]]
    });
  }

  get nome() {
    return this.formContato.get('nome');
  }

  get telefone() {
    return this.formContato.get('telefone');
  }

  get email() {
    return this.formContato.get('email');
  }

  get empresa() {
    return this.formContato.get('empresa');
  }

  get cargo() {
    return this.formContato.get('cargo');
  }

  public gravar(): void {

    if (this.formContato.invalid) return;

    this.contatoFormVM = Object.assign({}, this.contatoFormVM, this.formContato.value);

    this.contatoService.editar(this.contatoFormVM)
    .subscribe({
      next: (contatoEditado) => this.processarSucesso(contatoEditado),
      error: (erro) => this.processarFalha(erro)
    });

  }

  private processarSucesso(contato: FormsContatoViewModel): void {
    this.toastr.success('Operação bem sucedida!', 'Sucesso');
    this.router.navigate(['/contatos/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.toastr.error('Operação mal sucedida!', 'Fracasso');
      console.error(erro);
    }
  }

}
