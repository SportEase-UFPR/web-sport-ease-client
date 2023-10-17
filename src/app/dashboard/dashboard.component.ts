import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  faClose = faXmark;
  faConfirm = faCheck;

  constructor(
    private modalService: NgbModal,
    private ngxLoaderService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.ngxLoaderService.startLoader('loader-01');
    this.ngxLoaderService.stopLoader('loader-01');
  }

  openModalConfirmacao(modal: any): void {
    console.log('aqui');

    this.modalService.open(modal, {
      centered: true,
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  cancelarReserva() {}
}
