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
    const inicio = document.getElementById('inicio');
    const espacos = document.getElementById('espacos-esportivos');
    const minhasReservas = document.getElementById('minhas-reservas');
    const solicitarReservas = document.getElementById('solicitar-reserva');

    switch (url) {
      case 'dashboard':
        inicio?.classList.add('menu-actived');
        espacos?.classList.remove('menu-actived');
        minhasReservas?.classList.remove('menu-actived');
        solicitarReservas?.classList.remove('menu-actived');
        break;

      case 'espacos-esportivos':
        espacos?.classList.add('menu-actived');
        inicio?.classList.remove('menu-actived');
        minhasReservas?.classList.remove('menu-actived');
        solicitarReservas?.classList.remove('menu-actived');
        break;

      case 'minhas-reservas':
        minhasReservas?.classList.add('menu-actived');
        inicio?.classList.remove('menu-actived');
        espacos?.classList.remove('menu-actived');
        solicitarReservas?.classList.remove('menu-actived');
        break;

      case 'nova-reserva':
        solicitarReservas?.classList.add('menu-actived');
        inicio?.classList.remove('menu-actived');
        espacos?.classList.remove('menu-actived');
        minhasReservas?.classList.remove('menu-actived');
        break;

      default:
        inicio?.classList.remove('menu-actived');
        espacos?.classList.remove('menu-actived');
        minhasReservas?.classList.remove('menu-actived');
        solicitarReservas?.classList.remove('menu-actived');
        break;
    }
  }
}
