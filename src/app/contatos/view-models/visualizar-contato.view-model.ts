import { ListarCompromissoViewModel } from "src/app/Compromissos/view-models/listar-compromisso.view-model";

export class VisualizarContatoViewModel {

  id: string
  nome:	string;
  telefone:	string;
  email:	string;
  empresa: string;
  cargo:	string;
  compromissos: ListarCompromissoViewModel[];

}

