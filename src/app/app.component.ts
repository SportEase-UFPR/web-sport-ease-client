import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from './shared/services/local-storage/local-storage.service';
import { environment as env } from 'src/environments/environment';
import { UsuarioLs } from './shared/models/usuario-ls/usuario-ls.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private lsService: LocalStorageService) {}

  ngOnInit(): void {
    window.onresize = () => {
      this.formatLayout();
    };
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

    if (paginas) paginas.style.minHeight = `${alturaMaxima}px`;
  }

  isLogado(): boolean {
    const lsDados: UsuarioLs = this.lsService.get(env.ls_token);
    this.formatLayout();

    if (lsDados) {
      return lsDados.usuarioLogado!;
    } else {
      return false;
    }
  }
}
