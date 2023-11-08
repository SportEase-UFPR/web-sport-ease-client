import { Component, OnInit } from '@angular/core';
import { faBell } from '@fortawesome/free-regular-svg-icons';

import { faUserPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { CabecalhoService } from './services/cabecalho.service';
import { Notificacao } from '../shared/models/notificacao/notificacao.model';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss'],
})
export class CabecalhoComponent implements OnInit {
  faUser = faUserPen;
  faBell = faBell;
  faClose = faXmark;

  isHidden: boolean = false;
  qtdNotificaoNaoLida: number = 0;
  notificacoes: Notificacao[] = [];

  constructor(private cabecalhoService: CabecalhoService) {}

  ngOnInit(): void {
    this.cabecalhoService.buscarNotificacoesWithInterval().subscribe({
      next: (result) => {
        this.notificacoes = result;
        this.qtdNotificaoNaoLida = result.filter((n) => !n.lida).length;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  populate(intervalo?: number) {
    this.cabecalhoService.buscarNotificacoes().subscribe({
      next: (result) => {
        this.notificacoes = result;
        this.qtdNotificaoNaoLida = result.filter((n) => !n.lida).length;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getSaudacao(): string {
    const horaAtual = new Date().getHours();
    let saudacao = 'Bom dia';

    if (horaAtual >= 18 || horaAtual < 6) {
      saudacao = 'Boa noite';
    } else if (horaAtual >= 12) {
      saudacao = 'Boa tarde';
    }

    return saudacao;
  }

  toggleSidebar() {
    if (this.isHidden) {
      this.cabecalhoService.lerNotificacoes().subscribe({
        next: (result) => {
          this.populate();
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      this.populate();
    }
    this.isHidden = !this.isHidden;
  }
}
