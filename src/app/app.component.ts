import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template:  `
    <app-navbar></app-navbar>
    <h1>AppComponent olá mundo</h1>
  `
})
export class AppComponent {

  constructor(titulo: Title ) {
    titulo.setTitle("Início-eAgendaWeb");
  }
}
