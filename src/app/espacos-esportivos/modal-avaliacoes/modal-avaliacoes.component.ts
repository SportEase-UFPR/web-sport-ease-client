import { Component, OnInit, Input } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackReserva } from 'src/app/shared/models/reserva/feedback-reserva.model';

@Component({
  selector: 'app-modal-avaliacoes',
  templateUrl: './modal-avaliacoes.component.html',
  styleUrls: ['./modal-avaliacoes.component.scss'],
})
export class ModalAvaliacoesComponent implements OnInit {
  @Input() avaliacoes: FeedbackReserva[] = [];
  @Input() nome: string = '';
  faCancel = faXmark;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  closeModal() {
    this.modalService.dismissAll();
  }
}
