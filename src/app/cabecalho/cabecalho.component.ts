import { Component, OnInit, OnDestroy } from '@angular/core';
import { faBell } from '@fortawesome/free-regular-svg-icons';

import { faUserPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { CabecalhoService } from './services/cabecalho.service';
import { Notificacao } from '../shared/models/notificacao/notificacao.model';
import { Subject, take, takeUntil } from 'rxjs';
const moment = require('moment');

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss'],
})
export class CabecalhoComponent implements OnInit, OnDestroy {
  faUser = faUserPen;
  faBell = faBell;
  faClose = faXmark;

  isHidden: boolean = false;
  qtdNotificaoNaoLida: number = 0;
  notificacoes?: Notificacao[];

  notificacoes$ = new Subject();

  constructor(private cabecalhoService: CabecalhoService) {}

  ngOnInit(): void {
    /*
    this.notificacoes = undefined;
    this.cabecalhoService
      .buscarNotificacoesWithInterval()
      .pipe(takeUntil(this.notificacoes$))
      .subscribe({
        next: (result) => {
          this.notificacoes = result.sort((a, b) => b.id! - a.id!);
          this.qtdNotificaoNaoLida = result.filter((n) => !n.lida).length;
        },
        error: (err) => {
          this.notificacoes = [];
          console.error(err);
        },
      }); */
  }

  ngOnDestroy(): void {
    this.notificacoes$.next(null);
    this.notificacoes$.complete();
  }

  populate() {
    /* this.notificacoes = undefined;
    this.cabecalhoService
      .buscarNotificacoes()
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.notificacoes = result.sort((a, b) => b.id! - a.id!);
          this.qtdNotificaoNaoLida = result.filter((n) => !n.lida).length;
        },
        error: (err) => {
          this.notificacoes = [];
          console.error(err);
        },
      }); */
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
      this.cabecalhoService
        .lerNotificacoes()
        .pipe(take(1))
        .subscribe({
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

  showHoraNotificacao(hora: Date | string): string {
    const diffMinutes = moment().diff(hora, 'minutes');
    const diffHours = moment().diff(hora, 'hours');
    const diffDays = moment().diff(hora, 'days');
    const diffWeeks = moment().diff(hora, 'weeks');
    const diffMonths = moment().diff(hora, 'months');
    const diffYears = moment().diff(hora, 'years');

    if (diffMinutes < 60) {
      return `${diffMinutes}min`;
    } else if (diffHours < 24) {
      return `${diffHours}h`;
    } else if (diffDays < 7) {
      return `${diffDays}d`;
    } else if (diffWeeks < 4) {
      return `${diffWeeks}s`;
    } else if (diffMonths < 12) {
      return `${diffMonths}mês`;
    } else {
      return `${diffYears}a`;
    }
  }
}
