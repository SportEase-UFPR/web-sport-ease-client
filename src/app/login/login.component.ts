import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from './services/login.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginRequest } from '../shared/models/dto/login-request/login-request.model';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginResponse } from '../shared/models/dto/login-response/login-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public formLogin: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    senha: new FormControl(null, [Validators.required]),
  });

  inscricaoRota!: Subscription;
  inscricaoLogin!: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private toastrService: ToastrService,
    private ngxLoaderService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    document.body.classList.add('display-centered');

    this.inscricaoRota = this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        this.formLogin.get('email')?.setValue(queryParams?.['email']);
      }
    );
  }

  ngOnDestroy(): void {
    document.body.classList.remove('display-centered');
    this.inscricaoRota?.unsubscribe();
    this.inscricaoLogin?.unsubscribe();
  }

  navigate(url: string) {
    const email = this.formLogin.get('email');
    if (email?.valid) {
      this.router.navigate([`/${url}`], {
        queryParams: {
          email: email?.value,
        },
      });
    } else {
      this.router.navigateByUrl(`/${url}`);
    }
  }

  entrar() {
    this.ngxLoaderService.startLoader('loader-01');

    const form = this.formLogin;
    if (form.valid) {
      const dados: LoginRequest = new LoginRequest(
        form.get('email')?.value,
        form.get('senha')?.value
      );
      this.inscricaoLogin = this.loginService.login(dados).subscribe({
        next: (result: LoginResponse) => {
          this.ngxLoaderService.stopLoader('loader-01');
          this.loginService.setUsuarioLogado(result)
          this.router.navigateByUrl('/dashboard');
        },
        error: (err: HttpErrorResponse) => {
          this.ngxLoaderService.stopLoader('loader-01');

          switch (err.status) {
            case 403:
              this.toastrService.error(
                'E-mail ou senha incorretos. Por favor, verifique os dados informados.',
                'Não foi possível realizar o login'
              );
              break;

            case 412:
              this.toastrService.error(
                'Está conta não está ativa.',
                'Não foi possível realizar o login'
              );
              break;

            default:
              this.toastrService.error(
                'Por favor, tente novamente mais tarde.',
                'Não foi possível realizar o login'
              );
              break;
          }
        },
      });
    } else {
      this.ngxLoaderService.stopLoader('loader-01');
      this.toastrService.warning(
        'Por favor, preenecha todos os campos corretamente',
        'Não foi possível realziar o login'
      );
    }
  }
}
