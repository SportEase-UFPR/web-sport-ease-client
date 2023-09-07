import { Component, DoCheck, OnInit } from '@angular/core';
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

  ngOnInit(): void {}

  selectLayout(): boolean {
    if (!this.isLogado()) return true;

    const alturaJanela = window.innerHeight;
    const alturaMinima = Math.round(alturaJanela * 0.05);
    const alturaMaxima = Math.round(alturaJanela * 0.95) - alturaMinima;
    const cabecalho = document.getElementById('cabecalho');
    const menu = document.getElementById('menu');
    const paginas = document.getElementById('paginas');

    if (cabecalho) cabecalho.style.minHeight = `${alturaMinima}px`;

    if (menu) menu.style.minHeight = `${alturaMaxima}px`;

    if (paginas) paginas.style.minHeight = `${alturaMaxima}px`;

    return false;
  }

  isLogado(): boolean {
    const lsDados: UsuarioLs = this.lsService.get(env.ls_token);

    if (lsDados) {
      if (lsDados.usuarioLogado) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
