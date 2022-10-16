import { ListarContatoViewModel } from "src/app/contatos/view-models/listar-contato.view-model";
import { TipoLocalizacaoCompromissoEnum } from "./tipo-localizacao-compromisso.enum";

export class VisualizarCompromissoViewModel {
  assunto:	string;
  local:	string;
  tipoLocal:	TipoLocalizacaoCompromissoEnum;
  link:	string;
  data:	string;
  horaInicio:	string;
  horaTermino:	string;
  contato: ListarContatoViewModel[];
}
