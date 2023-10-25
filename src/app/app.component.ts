import { Component, OnDestroy, OnInit } from '@angular/core';

import { SessionStorageService } from './shared/services/session-storage/session-storage.service';
import { environment as env } from 'src/environments/environment';
import { LoginService } from './login/services/login.service';
import { UsuarioSs } from './shared/models/dto/usuario-ss/usuario-ss.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private ssService: SessionStorageService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    window.onresize = () => {
      this.formatLayout();
    };
  }

  ngOnDestroy(): void {
    this.loginService.logout();
  }

  formatLayout() {
    const alturaJanela = window.innerHeight;
    const alturaMinima = Math.round(alturaJanela * 0.05);
    const alturaMaxima = Math.round(alturaJanela * 0.95) - alturaMinima;
    const cabecalho = document?.getElementById('cabecalho');
    const menu = document?.getElementById('menu');
    const paginas = document?.getElementById('paginas');

    if (cabecalho) cabecalho.style.minHeight = `${alturaMinima}px`;

    if (menu) {
      menu.style.height = `${alturaMaxima}px`;
      menu.style.overflowY = 'scroll';
    }

    if (paginas) {
      paginas.style.height = `${alturaMaxima}px`;
      paginas.style.overflowY = 'scroll';
    }
  }

  isLogado(): boolean {
    const lsDados: UsuarioSs = this.ssService.get(env.ss_token);
    this.formatLayout();

    if (lsDados) {
      return lsDados.usuarioLogado!;
    } else {
      return false;
    }
  }
}
