import { CategoriaSelecionadaViewModel } from "./categoria-selecionada.viewmodel";
import { FormaPgtoDespesaEnum } from "./formapgtodespesaenum";

export class FormsDespesaViewModel {

  id: string;
  descricao:	string;
  valor: number;
  data:	string;
  formaPagamento:	FormaPgtoDespesaEnum;

  categoriasSelecionadas: CategoriaSelecionadaViewModel[];

 }
