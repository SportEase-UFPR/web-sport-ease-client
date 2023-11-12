import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faCheck,
  faFilterCircleXmark,
  faPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { MinhasReservasService } from './services/minhas-reservas.service';
import { ToastrService } from 'ngx-toastr';
import { ReservaFeitaResponse } from '../shared/models/reserva/reserva-feita-response';
import { StatusLocacao } from '../shared/models/enums/status-locacao';
import { Item } from '../shared/components/inputs/input-select-option/model/item.model';
import { faEye, faStar } from '@fortawesome/free-regular-svg-icons';
const moment = require('moment');
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ReservaAvaliacao } from '../shared/models/reserva/reserva-avaliacao.model';
import { BuildFilter } from '../utils/build-filter';

@Component({
  selector: 'app-minhas-reservas',
  templateUrl: './minhas-reservas.component.html',
  styleUrls: ['./minhas-reservas.component.scss'],
})
export class MinhasReservasComponent implements OnInit {
  formAvaliacao: FormGroup = new FormGroup({
    rating: new FormControl(null, [Validators.required]),
    comentario: new FormControl(null),
  });

  formFiltros: FormGroup = new FormGroup({
    dataInicial: new FormControl(null),
    dataFinal: new FormControl(null),
    local: new FormControl(null),
    status: new FormControl(null),
  });

  p: number = 1;

  minhasReservas?: ReservaFeitaResponse[];
  minhasReservasFilter?: ReservaFeitaResponse[];
  nomesLocais: { id: number; nome: string }[] = [];
  locais: Item[] = [];
  statusReservas: Item[] = [];
  minDate?: Date;
  maxDate?: Date;

  faAdd = faPlus;
  faConfirm = faCheck;
  faCancel = faXmark;
  faEye = faEye;
  faFilterRemove = faFilterCircleXmark;
  faStar = faStar;

  idReserva: number = 0;
  dadosReserva?: ReservaFeitaResponse;

  constructor(
    private router: Router,
    private minhasReservasService: MinhasReservasService,
    private toastrService: ToastrService,
    private ngxLoaderService: NgxUiLoaderService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.populate();

    this.formFiltros.get('dataInicial')?.valueChanges.subscribe((v) => {
      (this.minDate = new Date(v)), this.filterReservas();
    });

    this.formFiltros.get('dataFinal')?.valueChanges.subscribe((v) => {
      (this.maxDate = new Date(v)), this.filterReservas();
    });
  }

  populate() {
    this.minhasReservasService.listarReservas().subscribe({
      next: (result) => {
        this.minhasReservas = this.ordernarReservasByDate(result);
        this.montarFiltros();
      },
      error: (err) => {
        this.minhasReservas = [];
        this.toastrService.error(
          'Por favor, tente novamente mais tarde',
          'Erro ao buscar suas reservas'
        );
      },
    });
  }

  novaReserva(): void {
    this.router.navigateByUrl('/nova-reserva');
  }

  filterReservas(): void {
    const form = this.formFiltros;
    const dataInicial = form.get('dataInicial');
    const dataFinal = form.get('dataFinal');
    const localFilter = form.get('local')?.value;
    const statusFilter = form.get('status')?.value;

    let filteredReservas = this.minhasReservas;

    if (dataInicial?.value && dataFinal?.value) {
      const dataInicialValue = moment(dataInicial?.value).startOf('day');
      const dataFinalValue = moment(dataFinal?.value).startOf('day');

      if (dataFinalValue.diff(dataInicialValue, 'hour') >= 0) {
        this.ngxLoaderService.startLoader('loader-01');
        filteredReservas = filteredReservas?.filter((r) => {
          const dataReserva = moment(r.dataHoraInicioReserva);

          return (
            dataReserva.isSameOrAfter(dataInicialValue, 'day') &&
            dataReserva.isSameOrBefore(dataFinalValue, 'day')
          );
        });
        this.ngxLoaderService.stopLoader('loader-01');
      } else {
        dataFinal.patchValue(null);
        this.toastrService.info(
          'A data final não pode ser anterior à data inicial. Por favor, selecione uma data válida',
          'Período inválido'
        );
      }
    }

    if (localFilter) {
      this.ngxLoaderService.startLoader('loader-01');
      filteredReservas = filteredReservas?.filter(
        (r) => r.idEspacoEsportivo === Number(localFilter)
      );
      this.ngxLoaderService.stopLoader('loader-01');
    }

    if (statusFilter) {
      this.ngxLoaderService.startLoader('loader-01');
      filteredReservas = filteredReservas?.filter(
        (r) => r.status === statusFilter
      );
      this.ngxLoaderService.stopLoader('loader-01');
    }

    this.minhasReservasFilter = this.ordernarReservasByDate(filteredReservas!);
  }

  ordernarReservasByDate(
    reservas: ReservaFeitaResponse[]
  ): ReservaFeitaResponse[] {
    return reservas.sort((a, b) => {
      const dataA = moment(a.dataHoraInicioReserva).valueOf();
      const dataB = moment(b.dataHoraInicioReserva).valueOf();
      return dataA - dataB;
    });
  }

  statusToString(status: StatusLocacao): string {
    return status.toString();
  }

  showConfirmacaoReserva(data: string | Date, status: StatusLocacao): boolean {
    if (
      moment().diff(moment(data), 'minutes') >= 5 &&
      status === StatusLocacao.APROVADA
    ) {
      return true;
    }

    return false;
  }

  openModalConfirmacao(
    modal: any,
    idReserva: number,
    tamanho: string = 'md',
    dadosReserva?: ReservaFeitaResponse
  ): void {
    this.idReserva = idReserva;
    this.dadosReserva = dadosReserva;

    this.modalService.open(modal, {
      centered: true,
      size: tamanho,
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  cancelarReserva() {
    this.ngxLoaderService.startLoader('loader-01');
    this.minhasReservasService.cancelarReserva(this.idReserva).subscribe({
      next: (result) => {
        this.toastrService.success(
          'Sua reserva foi cancelada com sucesso',
          'Reserva cancelada'
        );
        this.populate();
        this.closeModal();
      },
      error: (err: HttpErrorResponse) => {
        switch (err.status) {
          case 412:
            this.toastrService.error(
              err.error.message,
              'Erro ao cancelar reserva'
            );
            break;

          default:
            this.toastrService.error(
              'Por favor, tente novamente mais tarde',
              'Erro ao cancelar reserva'
            );
            break;
        }
      },
    });
    this.ngxLoaderService.stopLoader('loader-01');
  }

  confirmarReserva() {
    this.ngxLoaderService.startLoader('loader-01');
    this.minhasReservasService.confirmarUsoReserva(this.idReserva).subscribe({
      next: (result) => {
        this.toastrService.success(
          'Confirmação de uso feita com sucesso',
          'Reserva confirmada'
        );
        this.populate();
        this.closeModal();
      },
      error: (err: HttpErrorResponse) => {
        switch (err.status) {
          case 412:
            this.toastrService.error(
              err.error.message,
              'Erro ao confirmar uso'
            );
            break;

          default:
            this.toastrService.error(
              'Por favor, tente novamente mais tarde',
              'Erro ao confirmar uso'
            );
            break;
        }
      },
    });
    this.ngxLoaderService.stopLoader('loader-01');
  }

  montarFiltros() {
    this.locais = [];
    this.statusReservas = [];

    this.minhasReservas?.forEach((r) => {
      BuildFilter.adicionarItem(
        this.locais,
        r.idEspacoEsportivo!,
        r.nomeEspacoEsportivo
      );

      BuildFilter.adicionarItem(this.statusReservas, r.status!);
    });
  }

  limparFiltros() {
    this.ngxLoaderService.startLoader('loader-01');
    this.minhasReservasFilter = undefined;
    this.formFiltros.reset();
    this.ngxLoaderService.stopLoader('loader-01');
  }

  showCancelarReserva(data: string | Date, status: StatusLocacao): boolean {
    if (
      moment(data).diff(moment(), 'minutes') >= 15 &&
      (status === StatusLocacao.APROVADA || status === StatusLocacao.SOLICITADA)
    ) {
      return true;
    }

    return false;
  }

  enviarAvaliacao() {
    const form = this.formAvaliacao;

    if (form.valid) {
      this.ngxLoaderService.startLoader('loader-01');
      this.minhasReservasService
        .avaliarResrva(
          this.idReserva,
          new ReservaAvaliacao(
            Number(form.get('rating')?.value),
            form.get('comentario')?.value
          )
        )
        .subscribe({
          next: (result) => {
            this.toastrService.success(
              'Avaliação da reserva realizada com sucesso',
              'Sucesso'
            );
            this.closeModal();
            this.populate();
          },
          error: (err) => {
            this.toastrService.error(
              'Por favor, tente novamente mais tarde',
              'Erro ao enviar avaliação'
            );
            this.closeModal();
          },
        });
      this.ngxLoaderService.stopLoader('loader-01');
    } else {
      this.toastrService.warning(
        'Por favor, informe a nota para a reserva',
        'A avaliação é obrigatória'
      );
    }
  }
}
