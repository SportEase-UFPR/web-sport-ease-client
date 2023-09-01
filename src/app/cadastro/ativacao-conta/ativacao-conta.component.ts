import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetectarMobile } from 'src/app/utils/detectar-mobile';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-ativacao-conta',
  templateUrl: './ativacao-conta.component.html',
  styleUrls: ['./ativacao-conta.component.scss'],
})
export class AtivacaoContaComponent implements OnInit, OnDestroy {
  ativandoConta: boolean = true;
  contaAtivada: boolean = false;
  isMobile: boolean = false;
  email = env.email
  detectarMobile: DetectarMobile = new DetectarMobile()

  constructor(private router: Router) {}

  ngOnInit(): void {
    document.body.classList.add('display-centered');
    this.isMobile = this.detectarMobile.isMobile()
  }

  ngOnDestroy(): void {
    document.body.classList.remove('display-centered');

  }

  navigate() {
    if (this.isMobile) {
      // lógica para abrir o app mobile
    } else {
      this.router.navigate(['/login']);
    }
  }
}
