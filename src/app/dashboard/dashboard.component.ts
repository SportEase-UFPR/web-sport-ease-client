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

  reservas: ReservaFeitaResponse[] = [];
  idReserva: number = 0;
  modalAvalicao?: any;

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
    this.ngxLoaderService.startLoader('loader-01');
    this.dashboardService.listarReservasAndamento().subscribe({
      next: (result) => {
        this.reservas = result;
      },
      error: (err) => {
        this.toastrService.warning(
          'Por favor, tente novamente em alguns instantes',
          'Não foi possível buscar suas reservas'
        );
      },
    });
    this.ngxLoaderService.stopLoader('loader-01');
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
    this.dashboardService.cancelarReserva(this.idReserva).subscribe({
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
    this.dashboardService.confirmarUsoReserva(this.idReserva).subscribe({
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
        .subscribe({
          next: (result) => {
            this.toastrService.success(
              'Avaliação da reserva realizada com sucesso',
              'Sucesso'
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
        'A avaliação é obrigatória'
      );
    }
  }

  navigate() {
    this.router.navigateByUrl('/nova-reserva');
  }
}
