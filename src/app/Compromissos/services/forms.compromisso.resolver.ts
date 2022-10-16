import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { FormsCompromissoViewModel } from "../view-models/forms-compromisso.view-model";
import { CompromissoService } from "./compromisso.service";

@Injectable()
export class FormsCompromissoResolver implements Resolve<FormsCompromissoViewModel> {

  constructor(private compromissoService: CompromissoService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<FormsCompromissoViewModel> {
    return this.compromissoService.selecionarPorId(route.params['id']);
  }
}
