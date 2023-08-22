import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowRightFromBracket,
  faDumbbell,
  faHouse,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, DoCheck {
  faHouse = faHouse;
  faDumbbell = faDumbbell;
  faClock = faClock;
  faPlus = faPlusSquare;
  faExit = faArrowRightFromBracket;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    const url = this.router.url;
    this.paginaAtual(url.split('/')[1]);
  }

  paginaAtual(url: string): void {
    const inicio = document.getElementById('inicio')?.classList;
    const espacos = document.getElementById('espacos-esportivos')?.classList;
    const minhasReservas = document.getElementById('minhas-reservas')?.classList;
    const solicitarReservas = document.getElementById('solicitar-reserva')?.classList;

    switch (url) {
      case 'dashboard':
        inicio?.add('menu-actived');
        espacos?.remove('menu-actived');
        minhasReservas?.remove('menu-actived');
        solicitarReservas?.remove('menu-actived');
        break;

      case 'espacos-esportivos':
        espacos?.add('menu-actived');
        inicio?.remove('menu-actived');
        minhasReservas?.remove('menu-actived');
        solicitarReservas?.remove('menu-actived');
        break;

      case 'minhas-reservas':
        minhasReservas?.add('menu-actived');
        inicio?.remove('menu-actived');
        espacos?.remove('menu-actived');
        solicitarReservas?.remove('menu-actived');
        break;

      case 'nova-reserva':
        solicitarReservas?.add('menu-actived');
        inicio?.remove('menu-actived');
        espacos?.remove('menu-actived');
        minhasReservas?.remove('menu-actived');
        break;

      default:
        inicio?.remove('menu-actived');
        espacos?.remove('menu-actived');
        minhasReservas?.remove('menu-actived');
        solicitarReservas?.remove('menu-actived');
        break;
    }
  }
}
