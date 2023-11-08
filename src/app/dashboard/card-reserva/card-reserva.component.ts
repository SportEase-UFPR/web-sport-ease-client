import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faAngleDown,
  faAngleUp,
  faCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { ReservaFeitaResponse } from 'src/app/shared/models/reserva/reserva-feita-response';
import { StatusLocacao } from 'src/app/shared/models/enums/status-locacao';
import { DashboardService } from '../services/dashboard.service';
const moment = require('moment');

@Component({
  selector: 'app-card-reserva',
  templateUrl: './card-reserva.component.html',
  styleUrls: ['./card-reserva.component.scss'],
})
export class CardReservaComponent implements OnInit {
  faConfirm = faCheck;
  faCancel = faXmark;

  motivoReservaCollapsed = false;
  justificativaReservaCollapsed = false;

  statusLocacao = StatusLocacao;
  local: string = '';

  @Input() dadosReserva?: ReservaFeitaResponse;

  @Output() emmiterClickCancelar = new EventEmitter();
  @Output() emmiterClickUsar = new EventEmitter();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService
      .buscarEE(this.dadosReserva?.idEspacoEsportivo!)
      .subscribe({
        next: (result) => {
          this.local = `${result.nome} - ${result.localidade}`;
        },
        error: (err) => {
          this.local = '';
        },
      });
  }

  changeIcon(isCollapsed: boolean) {
    return isCollapsed ? faAngleDown : faAngleUp;
  }

  cancelarReserva() {
    this.emmiterClickCancelar.emit();
  }

  confirmarUso() {
    this.emmiterClickUsar.emit();
  }

  statusToString(status: StatusLocacao): string {
    return status.toString();
  }

  showConfirmacaoReserva(): boolean {
    if (
      moment().diff(
        moment(this.dadosReserva?.dataHoraInicioReserva),
        'minutes'
      ) >= 5
    ) {
      return true;
    }

    return false;
  }

  showCancelarReserva(): boolean {
    if (
      moment(this.dadosReserva?.dataHoraInicioReserva).diff(moment(), 'minutes') >= 15
    ) {
      return true;
    }

    return false;
  }
}
