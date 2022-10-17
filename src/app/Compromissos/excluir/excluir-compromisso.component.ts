import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompromissoService } from '../services/compromisso.service';
import { VisualizarCompromissoViewModel } from '../view-models/visualizar-compromisso.view-model';

@Component({
  selector: 'app-excluir-compromisso',
  templateUrl: './excluir-compromisso.component.html',
  styles: [
  ]
})
export class ExcluirCompromissoComponent implements OnInit {

  public compromissoFormVM: VisualizarCompromissoViewModel;

  constructor(
      titulo: Title,
      private route: ActivatedRoute,
      private router: Router,
      private compromissoService: CompromissoService,
      private toastr: ToastrService
    ) {
    titulo.setTitle("Excluir compromisso - eAgendaWeb");
    this.compromissoFormVM = new VisualizarCompromissoViewModel();
  }

  ngOnInit(): void {
    this.compromissoFormVM = this.route.snapshot.data['compromisso'];
  }

  public gravar(): void {
    this.compromissoService.excluir(this.compromissoFormVM.id)
      .subscribe({
        next: (compromissoId) => this.processarSucesso(compromissoId),
        error: (erro) => this.processarFalha(erro)
      })
  }

  private processarSucesso(compromissoId: string): void {
    this.toastr.success("Operação bem sucedida", "Sucesso")
    this.router.navigate(['/compromissos/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.toastr.error("Operação mal sucedida", "Fracasso")
      console.error(erro);
    }
  }

}
