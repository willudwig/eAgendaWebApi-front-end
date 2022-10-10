export class VisualizarTarefaViewModel {
  id: string;
  titulo: string;
  prioridade: string;

  dataCriacao: Date;
  percentualConcluido: number;

  itens: VisualizarItemTarefaViewModel[] = [];
}

export class VisualizarItemTarefaViewModel {
  titulo: string;
  concluido: boolean;
}

