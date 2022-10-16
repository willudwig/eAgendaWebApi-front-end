import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { VisualizarCompromissoViewModel } from "../view-models/visualizar-compromisso.view-model";
import { CompromissoService } from "./compromisso.service";

@Injectable()
export class VisualizarCompromissoResolver implements Resolve<VisualizarCompromissoViewModel> {

  constructor(private compromissoService: CompromissoService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<VisualizarCompromissoViewModel> {
    return this.compromissoService.selecionarcompromissoCompletoPorId(route.params['id']);
  }
}
