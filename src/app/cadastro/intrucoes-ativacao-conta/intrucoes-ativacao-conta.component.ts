import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-intrucoes-ativacao-conta',
  templateUrl: './intrucoes-ativacao-conta.component.html',
  styleUrls: ['./intrucoes-ativacao-conta.component.scss'],
})
export class IntrucoesAtivacaoContaComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {
    document.body.classList.add('display-centered');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('display-centered');
  }
}
