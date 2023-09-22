import { Component, OnInit } from '@angular/core';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss'],
})
export class CabecalhoComponent implements OnInit {
  faFace = faFaceSmile;
  faUser = faUserPen;
  nomeCliente: string = 'Matheus';

  constructor() {}

  ngOnInit(): void {}

  getSaudacao(): string {
    const horaAtual = new Date().getHours();
    let saudacao = 'Bom dia';

    if (horaAtual > 18) {
      saudacao = 'Boa noite';
    } else if (horaAtual > 12) {
      saudacao = 'Boa tarde';
    }

    return saudacao;
  }
}
