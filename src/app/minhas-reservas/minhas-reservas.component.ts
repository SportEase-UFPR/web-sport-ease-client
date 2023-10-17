import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-minhas-reservas',
  templateUrl: './minhas-reservas.component.html',
  styleUrls: ['./minhas-reservas.component.scss'],
})
export class MinhasReservasComponent implements OnInit {
  formFiltros: FormGroup = new FormGroup({
    dataInicial: new FormControl(null),
    dataFinal: new FormControl(null),
    local: new FormControl(null),
    status: new FormControl(null),
  });

  p: number = 1;

  minhasReservas: number[] = [0, 1, 2];
  minhasReservasFilter: number[] = [0, 1, 2, 3, 45, 6];

  faAdd = faPlus;
  faConfirm = faCheck;
  faCancel = faXmark;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  novaReserva(): void {
    this.router.navigateByUrl('/nova-reserva');
  }

  filterByDate(): void {}

  filterByLocal(): void {}

  filterByStatus(): void {}
}
