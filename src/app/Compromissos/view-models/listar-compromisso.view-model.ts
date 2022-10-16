import { TipoLocalizacaoCompromissoEnum } from "./tipo-localizacao-compromisso.enum";

export class ListarCompromissoViewModel {
  assunto:	string;
  local:	string;
  tipoLocal:	TipoLocalizacaoCompromissoEnum;
  link:	string;
  data:	string;
  horaInicio:	string;
  horaTermino:	string;
  contatoId:	string;
}
