import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { EmailAtivacaoRequest } from 'src/app/shared/models/cliente/email-ativacao-request.model';
import { ClienteService } from 'src/app/shared/services/cliente/cliente.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-ativacao-email',
  templateUrl: './ativacao-email.component.html',
  styleUrls: ['./ativacao-email.component.scss'],
})
export class AtivacaoEmailComponent implements OnInit, OnDestroy {
  ativandoEmail: boolean = true;
  emailAtivada: boolean = false;
  email = env.email;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    document.body.classList.add('display-centered');

    this.activatedRoute.queryParams
      .pipe(take(1))
      .subscribe((queryParams) => {
        const token = queryParams['token'];

        if (token) {
          const ativacaoEmail: EmailAtivacaoRequest = new EmailAtivacaoRequest(
            token
          );
          this.clienteService
            .ativarEmail(ativacaoEmail)
            .pipe(take(1))
            .subscribe({
              next: (result) => {
                this.ativandoEmail = false;
                this.emailAtivada = true;
              },

              error: (err) => {
                this.ativandoEmail = false;
                this.emailAtivada = false;
              },
            });
        } else {
          this.ativandoEmail = false;
          this.emailAtivada = false;
        }
      });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('display-centered');
  }

  navigate() {
    this.router.navigate(['/login']);
  }
}
