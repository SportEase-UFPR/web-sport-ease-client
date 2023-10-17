import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowRightFromBracket,
  faDumbbell,
  faHouse,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../login/services/login.service';

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

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    const url = this.router.url;
    this.paginaAtual(url.split('/')[1]?.split('?')[0]);
  }

  paginaAtual(url: string): void {
    const menuList: { [key: string]: string } = {
      dashboard: 'inicio',
      'espacos-esportivos': 'espacos-esportivos',
      'minhas-reservas': 'minhas-reservas',
      'nova-reserva': 'solicitar-reserva',
    };

    for (const item of Object.values(menuList)) {
      const element = document.getElementById(item);
      if (element) {
        element.classList.remove('menu-actived');
      }
    }

    const menuItem = menuList?.[url];
    if (menuItem) {
      const element = document.getElementById(menuItem);
      if (element) {
        element.classList.add('menu-actived');
      }
    }
  }

  sair() {
    if (this.loginService.logout()) {
      this.router.navigateByUrl('/login');
    }
  }
}
