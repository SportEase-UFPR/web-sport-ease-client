import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intrucoes-ativacao-conta',
  templateUrl: './intrucoes-ativacao-conta.component.html',
  styleUrls: ['./intrucoes-ativacao-conta.component.scss'],
})
export class IntrucoesAtivacaoContaComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  ngOnInit(): void {
    document.body.classList.add('display-centered');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('display-centered');
  }

  navigate() {
    this.router.navigateByUrl('/login');
  }
}
