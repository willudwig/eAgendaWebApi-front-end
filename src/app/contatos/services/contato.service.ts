import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { LocalStorageService } from "src/app/auth/services/local-storage.service";
import { environment } from "src/environments/environment";
import { FormsContatoViewModel } from "../view-models/forms-contato.view-model";
import { VisualizarContatoViewModel } from "../view-models/visualizar-contato.view-model";


@Injectable()
export class ContatoService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService

  ) { }

  public selecionarPorId(id: string): Observable<FormsContatoViewModel>  {
    const resposta = this.http
      .get<FormsContatoViewModel>(this.apiUrl + 'contatos/' + id, this.obterHeadersAutorizacao())
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

  public selecionarContatoCompletaPorId(id: string): Observable<VisualizarContatoViewModel> {
    const resposta = this.http
      .get<VisualizarContatoViewModel>(this.apiUrl + 'contatos/visualizacao-completa/' + id, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }
}
