import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContatoService } from '../services/contato.service';
import { VisualizarContatoViewModel } from '../view-models/visualizar-contato.view-model';

@Component({
  selector: 'app-excluir-contato',
  templateUrl: './excluir-contato.component.html',
  styles: [
  ]
})
export class ExcluirContatoComponent implements OnInit {

  public contatoFormVM: VisualizarContatoViewModel;

  constructor(
      titulo: Title,
      private route: ActivatedRoute,
      private router: Router,
      private contatoService: ContatoService,
      private toastr: ToastrService
    ) {
    titulo.setTitle("Excluir Contato - eAgendaWeb");
    this.contatoFormVM = new VisualizarContatoViewModel();
  }

  ngOnInit(): void {
    this.contatoFormVM = this.route.snapshot.data['contato'];
  }

  public gravar(): void {
    this.contatoService.excluir(this.contatoFormVM.id)
      .subscribe({
        next: (contatoId) => this.processarSucesso(contatoId),
        error: (erro) => this.processarFalha(erro)
      })
  }

  private processarSucesso(tarefaId: string): void {
    this.toastr.success("Operação bem sucedida", "Sucesso")
    this.router.navigate(['/contatos/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.toastr.error("Operação mal sucedida", "Fracasso")
      console.error(erro);
    }
  }

}
