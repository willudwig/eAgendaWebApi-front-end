import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TarefaService } from '../services/tarefa.service';
import { VisualizarTarefaViewModel } from '../view-models/visualizar-tarefa.view-model';

@Component({
  selector: 'app-excluir-tarefa',
  templateUrl: './excluir-tarefa.component.html',
  styles: [
  ]
})
export class ExcluirTarefaComponent implements OnInit {

  public tarefaFormVM: VisualizarTarefaViewModel = new VisualizarTarefaViewModel();

  constructor(
    titulo: Title,
    private route: ActivatedRoute,
    private router: Router,
    private tarefaService: TarefaService,
    private toastr: ToastrService
  ) {
    titulo.setTitle('Excluir Tarefa - e-Agenda');
  }

  ngOnInit(): void {
    this.tarefaFormVM = this.route.snapshot.data['tarefa'];
  }

  public gravar() {

    this.tarefaService.excluir(this.tarefaFormVM.id)
      .subscribe({
        next: (tarefaId) => this.processarSucesso(tarefaId),
        error: (erro) => this.processarFalha(erro)
      })
  }

  private processarSucesso(tarefaId: string): void {
    this.toastr.success("Operação bem sucedida", "Sucesso")
    this.router.navigate(['/tarefas/listar']);
  }

  private processarFalha(erro: any) {
    if (erro) {
      this.toastr.error("Operação mal sucedida", "Fracasso")
      console.error(erro);
    }
  }

}
