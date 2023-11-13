import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetectarMobile } from 'src/app/utils/detectar-mobile';
import { environment as env } from 'src/environments/environment';
import { CadastroService } from '../services/cadastro.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-ativacao-conta',
  templateUrl: './ativacao-conta.component.html',
  styleUrls: ['./ativacao-conta.component.scss'],
})
export class AtivacaoContaComponent implements OnInit, OnDestroy {
  ativandoConta: boolean = true;
  contaAtivada: boolean = false;
  isMobile: boolean = false;
  email = env.email;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cadastroService: CadastroService
  ) {}

  ngOnInit(): void {
    document.body.classList.add('display-centered');
    this.isMobile = DetectarMobile.isMobile();

    this.activatedRoute.queryParams.pipe(take(1)).subscribe((queryParams) => {
      const token = queryParams['token'];

      if (token) {
        this.cadastroService
          .ativarConta(token)
          .pipe(take(1))
          .subscribe({
            next: (result) => {
              this.ativandoConta = false;
              this.contaAtivada = true;
            },

            error: (err) => {
              this.ativandoConta = false;
              this.contaAtivada = false;
            },
          });
      } else {
        this.ativandoConta = false;
        this.contaAtivada = false;
      }
    });
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
