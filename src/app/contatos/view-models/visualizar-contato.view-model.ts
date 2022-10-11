import { ListarCompromissoViewModel } from "src/app/Compromissos/view-models/listar-compromisso.view-model";

export class VisualizarContatoViewModel {
  nome:	string;
  email:	string;
  telefone:	string;
  empresa: string;
  cargo:	string;
  compromissos: ListarCompromissoViewModel[];
}

