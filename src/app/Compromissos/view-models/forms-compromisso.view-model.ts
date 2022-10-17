import { TimeInterval } from "rxjs/internal/operators/timeInterval";
import { TipoLocalizacaoCompromissoEnum } from "./tipo-localizacao-compromisso.enum"

export class FormsCompromissoViewModel {

  id: string;
  assunto:	string;
  local:	string;
  tipoLocal:	TipoLocalizacaoCompromissoEnum;
  link:	string;
  data:	string;
  horaInicio:	 TimeInterval<any>;
  horaTermino:	string;
  contatoId:	string;
}
