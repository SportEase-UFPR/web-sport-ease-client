import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from '../services/login.service';
import { InstrucoesRecuperacaoRequest } from 'src/app/shared/models/cliente/instrucoes-recuperacao-request.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss'],
})
export class RecuperarSenhaComponent implements OnInit, OnDestroy {
  public formRecuperarSenha: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  inscricaoRota!: Subscription;
  inscricaoIntrucoes!: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private ngxService: NgxUiLoaderService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    document.body.classList.add('display-centered');

    this.inscricaoRota = this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        this.formRecuperarSenha.get('email')?.setValue(queryParams?.['email']);
      }
    );
  }

  ngOnDestroy(): void {
    document.body.classList.remove('display-centered');
    this.inscricaoIntrucoes?.unsubscribe();
    this.inscricaoRota?.unsubscribe();
  }

  recuperarSenha() {
    this.ngxService.startLoader('loader-01');
    const form = this.formRecuperarSenha;
    if (form.valid) {
      const dados: InstrucoesRecuperacaoRequest =
        new InstrucoesRecuperacaoRequest(form.get('email')?.value);

      this.inscricaoIntrucoes = this.loginService
        .enviarIntrucoesRecuperacao(dados)
        .subscribe({
          next: (result) => {
            this.ngxService.stopLoader('loader-01');
            this.toastrService.success(
              'Em alguns minutos você receberá o e-mail com as instruções.',
              'Email enviado!'
            );
          },
          error: (err) => {
            this.toastrService.warning(
              'Não foi possível enviar o e-mail. Por favor, tente novamente mais tarde.',
              'Falha ao enviar e-mail!'
            );
            this.ngxService.stopLoader('loader-01');
          },
        });
    }
  }

  navigate() {
    const email = this.formRecuperarSenha.get('email');
    if (email?.valid) {
      this.router.navigate(['/login'], {
        queryParams: {
          email: email?.value,
        },
      });
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
