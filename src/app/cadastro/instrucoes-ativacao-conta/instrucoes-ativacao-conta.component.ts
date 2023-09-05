import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instrucoes-ativacao-conta',
  templateUrl: './instrucoes-ativacao-conta.component.html',
  styleUrls: ['./instrucoes-ativacao-conta.component.scss'],
})
export class InstrucoesAtivacaoContaComponent implements OnInit, OnDestroy {
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
