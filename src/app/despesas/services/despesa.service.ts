import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { LocalStorageService } from "src/app/auth/services/local-storage.service";
import { environment } from "src/environments/environment";
import { FormsDespesaViewModel } from "../view-models/forms-despesa.view-model";
import { ListarDespesaViewModel } from "../view-models/listar-despesa.view-model";
import { VisualizarDespesaViewModel } from "../view-models/visualizar-despesa.view-model";


@Injectable()
export class DespesaService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  public inserir(despesa: FormsDespesaViewModel): Observable<FormsDespesaViewModel> {
    const resposta = this.http
      .post<FormsDespesaViewModel>(this.apiUrl + 'despesas', despesa, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  public editar(despesa: FormsDespesaViewModel): Observable<FormsDespesaViewModel> {
    const resposta = this.http
      .put<FormsDespesaViewModel>(this.apiUrl + 'despesas/' + despesa.id, despesa, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  public excluir(id: string): Observable<string> {
    const resposta = this.http
      .delete<string>(this.apiUrl + 'despesas/' + id, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  public selecionarTodos(): Observable<ListarDespesaViewModel[]> {
    const resposta = this.http
      .get<ListarDespesaViewModel[]>(this.apiUrl + 'despesas', this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  public selecionarPorId(id: string): Observable<FormsDespesaViewModel> {
    const resposta = this.http
      .get<FormsDespesaViewModel>(this.apiUrl + 'despesas/' + id, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  public selecionarDespesaCompletoPorId(id: string): Observable<VisualizarDespesaViewModel> {
    const resposta = this.http
      .get<VisualizarDespesaViewModel>(this.apiUrl + 'despesas/visualizacao-completa/' + id, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  private obterHeadersAutorizacao() {
    const token = this.localStorageService.obterTokenUsuario();

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
  }

  private processarDados(resposta: any) {
    if (resposta?.sucesso)
      return resposta.dados;
    else
      return resposta;
  }

  private processarFalha(resposta: any) {
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}
