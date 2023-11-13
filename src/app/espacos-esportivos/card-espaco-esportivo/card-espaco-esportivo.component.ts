import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  faCalendarCheck,
  faCalendarXmark,
} from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { EspacoEsportivoResponse } from 'src/app/shared/models/espaco-esportivo/espaco-esportivo-response.model';
import { EspacosEsportivosService } from '../services/espacos-esportivos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAvaliacoesComponent } from '../modal-avaliacoes/modal-avaliacoes.component';
import { FeedbackReserva } from 'src/app/shared/models/reserva/feedback-reserva.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-card-espaco-esportivo',
  templateUrl: './card-espaco-esportivo.component.html',
  styleUrls: ['./card-espaco-esportivo.component.scss'],
})
export class CardEspacoEsportivoComponent implements OnInit {
  @Input() espaco!: EspacoEsportivoResponse;
  avaliacoes: FeedbackReserva[] = [];

  daysOfWeek: string[] = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];

  faCalendar = faCalendarCheck;
  faCalendarX = faCalendarXmark;
  faStar = faStar;

  constructor(
    private sanatizer: DomSanitizer,
    private router: Router,
    private modalService: NgbModal,
    private eeService: EspacosEsportivosService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  sanatizerImg(imgUrl: string) {
    return this.sanatizer.bypassSecurityTrustResourceUrl(
      `data:image/jpeg;base64,${imgUrl}`
    );
  }

  solicitarReserva(id: number): void {
    this.router.navigate(['/nova-reserva'], {
      queryParams: {
        espaco: id,
      },
    });
  }

  buildingStartsRating(media: number): string[] {
    let stars = ['a', 'a', 'a', 'a', 'a'];
    if (media <= 4.7) {
      const parteInteira = Math.trunc(media);
      const parteDecimal = media % 1;
      for (let i = parteInteira; i < 5; i++) {
        if (i == parteInteira) {
          stars[i] =
            parteDecimal <= 0.3 ? 'c' : parteDecimal >= 0.7 ? 'a' : 'm';
        } else {
          stars[i] = 'c';
        }
      }
    }

    return stars;
  }

  buscarAvaliacoes() {
    this.avaliacoes = [];
    this.eeService.buscarComentarios(this.espaco.id!).subscribe({
      next: (result) => {
        this.avaliacoes = result.filter((c) => c.comentario);

        if (this.avaliacoes.length > 0) {
          this.openModal();
        } else {
          this.toastrService.info(
            `Até o momento ${this.espaco.nome} não possui avaliações`,
            'Nenhuma avaliação encontrada'
          );
        }
      },
      error: (err: HttpErrorResponse) => {
        this.toastrService.warning(
          err.error.message ?? 'Por favor, tente novamente mais tarde',
          'Erro ao buscar avaliações'
        );
      },
    });
  }

  openModal(): void {
    const modalRef = this.modalService.open(ModalAvaliacoesComponent, {
      centered: true,
      size: 'lg',
    });

    modalRef.componentInstance.avaliacoes = this.avaliacoes;
    modalRef.componentInstance.nome = this.espaco.nome;
  }
}
