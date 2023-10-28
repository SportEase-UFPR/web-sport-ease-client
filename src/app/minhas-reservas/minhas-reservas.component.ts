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
import { ReservaFeitaResponse } from '../shared/models/dto/reserva-feita-response/reserva-feita-response';
import { StatusLocacao } from '../shared/models/enums/status-locacao/status-locacao';
import { Item } from '../shared/components/inputs/input-select-option/model/item.model';
import { faEye, faStar } from '@fortawesome/free-regular-svg-icons';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-minhas-reservas',
  templateUrl: './minhas-reservas.component.html',
  styleUrls: ['./minhas-reservas.component.scss'],
})
export class MinhasReservasComponent implements OnInit {
  formAvaliacao: FormGroup = new FormGroup({
    rating: new FormControl(-1, [Validators.required]),
    comentario: new FormControl(null),
  });

  formFiltros: FormGroup = new FormGroup({
    dataInicial: new FormControl(null),
    dataFinal: new FormControl(null),
    local: new FormControl(null),
    status: new FormControl(null),
  });

  p: number = 1;

  minhasReservas: ReservaFeitaResponse[] = [];
  minhasReservasFilter?: ReservaFeitaResponse[];
  locais: Item[] = [];
  nomesLocais: { id: number; nome: string }[] = [];
  statusReservas: Item[] = [
    { label: 'Solicitada', value: 'SOLICITADA' },
    { label: 'Aprovada', value: 'APROVADA' },
    { label: 'Negada', value: 'NEGADA' },
    { label: 'Cancelada', value: 'CANCELADA' },
    { label: 'Finalizada', value: 'FINALIZADA' },
    { label: 'Abandonada', value: 'ABANDONADA' },
  ];

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

    this.minhasReservasService.buscarTodosEE().subscribe({
      next: (result) => {
        result.forEach((ee) => {
          this.locais.push(new Item(ee.id, ee.nome));
        });
      },
    });
  }

  populate() {
    this.ngxLoaderService.startLoader('loader-01');
    this.minhasReservasService.listarReservas().subscribe({
      next: (result) => {
        this.minhasReservas = this.ordernarReservasByDate(result);
        this.minhasReservas.forEach((r) => {
          this.minhasReservasService.buscarEE(r.idEspacoEsportivo!).subscribe({
            next: (ee) => {
              this.nomesLocais.push({ id: ee.id!, nome: ee.nome! });
            },
          });
        });
      },
      error: (err) => {
        this.toastrService.error(
          'Por favor, tente novamente mais tarde',
          'Erro ao buscar suas reservas'
        );
      },
    });
    this.ngxLoaderService.stopLoader('loader-01');
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
      const dataInicialValue = moment(dataInicial?.value);
      const dataFinalValue = moment(dataFinal?.value);

      if (dataFinalValue.diff(dataInicialValue, 'hour') >= 0) {
        this.ngxLoaderService.startLoader('loader-01');
        filteredReservas = filteredReservas.filter((r) => {
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
      filteredReservas = filteredReservas.filter(
        (r) => r.idEspacoEsportivo === Number(localFilter)
      );
      this.ngxLoaderService.stopLoader('loader-01');
    }

    if (statusFilter) {
      this.ngxLoaderService.startLoader('loader-01');
      filteredReservas = filteredReservas.filter(
        (r) => r.status === statusFilter
      );
      this.ngxLoaderService.stopLoader('loader-01');
    }

    this.minhasReservasFilter = this.ordernarReservasByDate(filteredReservas);
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

  getNomeLocal(id: number): string {
    const ee = this.nomesLocais.filter((e) => e.id === id);

    return ee[0]?.nome;
  }

  statusToString(status: StatusLocacao): string {
    return status.toString();
  }

  showConfirmacaoReserva(data: string | Date, status: StatusLocacao): boolean {
    if (
      moment().diff(moment(data), 'hour') >= 0 &&
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
    console.log('Aqui');

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
  }

  confirmarReserva() {
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
  }

  limparFiltros() {
    this.ngxLoaderService.startLoader('loader-01');
    this.minhasReservasFilter = undefined;
    this.formFiltros.reset();
    this.ngxLoaderService.stopLoader('loader-01');
  }

  enviarAvaliacao() {}
}
