import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Subject, distinctUntilChanged, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-minhas-reservas',
  templateUrl: './minhas-reservas.component.html',
  styleUrls: ['./minhas-reservas.component.scss'],
})
export class MinhasReservasComponent implements OnInit, OnDestroy {
  formAvaliacao: FormGroup = new FormGroup({
    rating: new FormControl(null, [Validators.required]),
    comentario: new FormControl(null),
  });

  formFiltros: FormGroup = new FormGroup({
    dataInicial: new FormControl(null),
    dataFinal: new FormControl(null),
    local: new FormControl(-1),
    status: new FormControl(-1),
  });

  p: number = 1;

  minhasReservas?: ReservaFeitaResponse[];
  minhasReservasFilter?: ReservaFeitaResponse[];
  nomesLocais: { id: number; nome: string }[] = [];
  locais: Item[] = [];
  statusReservas: Item[] = [];
  minDate?: Date = undefined;
  maxDate?: Date = undefined;
  showLimparFiltros: boolean = false;

  faAdd = faPlus;
  faConfirm = faCheck;
  faCancel = faXmark;
  faEye = faEye;
  faFilterRemove = faFilterCircleXmark;
  faStar = faStar;

  idReserva: number = 0;
  dadosReserva?: ReservaFeitaResponse;

  dataInicial$ = new Subject();
  dataFinal$ = new Subject();

  constructor(
    private router: Router,
    private minhasReservasService: MinhasReservasService,
    private toastrService: ToastrService,
    private ngxLoaderService: NgxUiLoaderService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.populate();

    this.formFiltros
      .get('dataInicial')
      ?.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.dataInicial$))
      .subscribe((v) => {
        if (v) {
          this.minDate = new Date(v);
          this.filterReservas();
        }
      });

    this.formFiltros
      .get('dataFinal')
      ?.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.dataFinal$))
      .subscribe((v) => {
        if (v) {
          this.maxDate = new Date(v);
          this.filterReservas();
        }
      });
  }

  ngOnDestroy(): void {
    this.dataInicial$.next(null);
    this.dataFinal$.next(null);
    this.dataInicial$.complete();
    this.dataFinal$.complete();
  }

  populate() {
    this.minhasReservasService
      .listarReservas()
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.minhasReservas = this.ordernarReservasById(result);
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
    const dataInicial = form.get('dataInicial')?.value;
    const dataFinal = form.get('dataFinal')?.value;
    const localFilter = form.get('local')?.value;
    const statusFilter = form.get('status')?.value;

    let filteredReservas = this.minhasReservas;

    this.p = 1;

    if (Number(localFilter) == -1) {
      this.ngxLoaderService.startLoader('loader-01');
      filteredReservas = this.minhasReservas;
      this.showLimparFiltros = false;
    }

    if (Number(statusFilter) == -1) {
      this.ngxLoaderService.startLoader('loader-01');
      filteredReservas = this.minhasReservas;
      this.showLimparFiltros = false;
    }

    if (dataInicial) {
      const dataInicialValue = moment(dataInicial).startOf('day');
      this.ngxLoaderService.startLoader('loader-01');
      filteredReservas = filteredReservas?.filter((r) => {
        const dataReserva = moment(r.dataHoraInicioReserva);

        return dataReserva.isSameOrAfter(dataInicialValue, 'day');
      });
      this.showLimparFiltros = true;
    }

    if (dataFinal) {
      const dataFinalValue = moment(dataFinal).startOf('day');
      this.ngxLoaderService.startLoader('loader-01');
      filteredReservas = filteredReservas?.filter((r) => {
        const dataReserva = moment(r.dataHoraInicioReserva);

        return dataReserva.isSameOrBefore(dataFinalValue, 'day');
      });
      this.showLimparFiltros = true;
    }

    if (localFilter && localFilter != -1) {
      this.ngxLoaderService.startLoader('loader-01');
      filteredReservas = filteredReservas?.filter(
        (r) => r.idEspacoEsportivo === Number(localFilter)
      );
      this.showLimparFiltros = true;
    }

    if (statusFilter && statusFilter != -1) {
      this.ngxLoaderService.startLoader('loader-01');
      filteredReservas = filteredReservas?.filter(
        (r) => r.status === statusFilter
      );
      this.showLimparFiltros = true;
    }

    setTimeout(() => {
      this.minhasReservasFilter = this.ordernarReservasById(filteredReservas!);
      this.ngxLoaderService.stopLoader('loader-01');
    }, 500);
  }

  montarFiltros() {
    this.locais = [];
    this.statusReservas = [];

    BuildFilter.adicionarItem(this.locais, -1, 'Todos');
    BuildFilter.adicionarItem(this.statusReservas, -1, 'Todas');

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
    this.formFiltros.patchValue({
      dataInicial: null,
      dataFinal: null,
      local: -1,
      status: -1,
    });
    this.minhasReservasFilter = undefined;
    this.minDate = undefined;
    this.maxDate = undefined;
    this.showLimparFiltros = false;
    this.p = 1;
    this.ngxLoaderService.stopLoader('loader-01');
  }

  ordernarReservasById(
    reservas: ReservaFeitaResponse[]
  ): ReservaFeitaResponse[] {
    return reservas.sort((a, b) => {
      const dataA = moment(a.dataHoraInicioReserva).valueOf();
      const dataB = moment(b.dataHoraInicioReserva).valueOf();
      return dataB - dataA;
    });
  }

  statusToString(status: StatusLocacao): string {
    return status.toString();
  }

  showConfirmacaoReserva(data: string | Date, status: StatusLocacao): boolean {
    if (
      moment(data).diff(moment(), 'minutes') <= 0 &&
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
    this.minhasReservasService
      .cancelarReserva(this.idReserva)
      .pipe(take(1))
      .subscribe({
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
    this.minhasReservasService
      .confirmarUsoReserva(this.idReserva)
      .pipe(take(1))
      .subscribe({
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

  showCancelarReserva(data: string | Date, status: StatusLocacao): boolean {
    if (status == 'SOLICITADA') {
      return true;
    }

    if (status == 'APROVADA') {
      if (moment(data).diff(moment(), 'hours') >= 24) {
        return true;
      }

      return false;
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
        .pipe(take(1))
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
        'A nota é obrigatória'
      );
    }
  }
}
