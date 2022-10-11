import { Injectable } from "@angular/core";
import { TokenViewModel, UsuarioTokenViewModel } from "../viewmodels/token.view-model";

@Injectable()
export class LocalStorageService {

  public salvarDadosLocaisUsuario(resposta: TokenViewModel): void {
    this.salvarTokenUsuario(resposta.chave);
    this.salvarUsuario(resposta.usuarioToken);
  }

  public salvarTokenUsuario(token: string) {
    localStorage.setItem('eAgenda.token', token);
  }

  public salvarUsuario(usuario: UsuarioTokenViewModel) {
    const jsonString = JSON.stringify(usuario);

    localStorage.setItem('eAgenda.usuario', jsonString);
  }

  public obterUsuarioLogado() {
    const usuarioJson = localStorage.getItem('eAgenda.usuario');

    if (usuarioJson)
      return JSON.parse(usuarioJson) as UsuarioTokenViewModel;

    return null;
  }

  public obterTokenUsuario(): string {
    return localStorage.getItem('eAgenda.token') ?? '';
  }

  public limparDadosLocais() {
    localStorage.removeItem('eAgenda.token');
    localStorage.removeItem('eAgenda.usuario');
  }
}
