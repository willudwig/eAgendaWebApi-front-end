import { TipoLocalizacaoCompromissoEnum } from "./tipo-localizacao-compromisso.enum"

export class FormsCompromissoViewModel {

  id: string;
  assunto:	string;
  nullable: true;
  local:	string;
  tipoLocal:	TipoLocalizacaoCompromissoEnum;
  link:	string;
  data:	string;
  horaInicio:	string;
  horaTermino:	string;
  contatoId:	string;

}
