import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss'],
})
export class ModalConfirmacaoComponent implements OnInit {
  @Input() email!: string;

  faClose = faXmark;
  faConfirm = faCheck;

  constructor(public activeModal: NgbActiveModal, private router: Router) {}

  ngOnInit(): void {}

  navigate(): void {
    this.activeModal.close();
    this.router.navigateByUrl('/dashboard');
  }
}
