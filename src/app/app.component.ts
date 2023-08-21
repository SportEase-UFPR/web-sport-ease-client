import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, DoCheck {
  isNotLogado: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    const url = this.router.url;
    this.isNotLogado = this.isCliente(url.split('/')[1]);
  }

  isCliente(url: string): boolean {
    if (
      url === 'login' ||
      url === 'autocadastro' ||
      url === 'confirmacao-cadastro'
    )
      return true;

    const alturaJanela = window.innerHeight;
    const alturaMinima = Math.round(alturaJanela * 0.05);
    const alturaMaxima = Math.round(alturaJanela * 0.95) - alturaMinima;
    const cabecalho = document.getElementById('cabecalho');
    const menu = document.getElementById('menu');
    const paginas = document.getElementById('paginas');

    console.log(alturaJanela, alturaMinima, alturaMaxima)

    if (cabecalho) cabecalho.style.minHeight = `${alturaMinima}px`;

    if (menu) menu.style.minHeight = `${alturaMaxima}px`;

    if (paginas) paginas.style.minHeight = `${alturaMaxima}px`;

    return false;
  }
}
