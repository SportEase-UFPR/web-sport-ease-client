import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss'],
})
export class RecuperarSenhaComponent implements OnInit, OnDestroy {
  public formRecuperarSenha: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    document.body.classList.add('display-centered');

    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.formRecuperarSenha.get('email')?.setValue(queryParams?.['email']);
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('display-centered');
  }

  recuperarSenha() {
    // lógica para enviar o e-mail com instruções para recuperar a senha
    this.toastrService.success('Em alguns minutos você receberá o e-mail com as instruções.', 'Email enviado!')
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
