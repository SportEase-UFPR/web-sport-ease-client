import { Component, OnInit } from '@angular/core';
import { faAdd, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from './services/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { ReservaFeitaResponse } from '../shared/models/reserva/reserva-feita-response';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservaAvaliacao } from '../shared/models/reserva/reserva-avaliacao.model';
import { take } from 'rxjs';
import { SeparaArray } from '../utils/separa-array';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  formAvaliacao: FormGroup = new FormGroup({
    rating: new FormControl(-1, [Validators.required]),
    comentario: new FormControl(null),
  });

  faClose = faXmark;
  faConfirm = faCheck;
  faAdd = faAdd;

  reservas?: ReservaFeitaResponse[];
  idReserva: number = 0;
  modalAvalicao?: any;

  protected separaArray = SeparaArray;

  constructor(
    private modalService: NgbModal,
    private ngxLoaderService: NgxUiLoaderService,
    private toastrService: ToastrService,
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.populate();
  }

  populate(): void {
    this.dashboardService
      .listarReservasAndamento()
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.reservas = result;
        },
        error: (err) => {
          this.reservas = [];
          this.toastrService.warning(
            err.error.message ??
              'Por favor, tente novamente em alguns instantes',
            'Não foi possível buscar suas reservas'
          );
        },
      });
  }

  openModalConfirmacao(
    modal: any,
    idReserva: number,
    modalAvaliacao?: any
  ): void {
    this.idReserva = idReserva;
    this.modalAvalicao = modalAvaliacao;

    this.modalService.open(modal, {
      centered: true,
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  cancelarReserva() {
    this.ngxLoaderService.startLoader('loader-01');
    this.dashboardService
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
    this.dashboardService
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
          this.openModalConfirmacao(this.modalAvalicao!, this.idReserva);
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

  enviarAvaliacao() {
    const form = this.formAvaliacao;

    if (form.valid) {
      this.ngxLoaderService.startLoader('loader-01');
      this.dashboardService
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
              'Avaliação feita'
            );
            this.closeModal();
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

  navigate() {
    this.router.navigateByUrl('/nova-reserva');
  }
}
