import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    document.body.classList.add('display-centered');

    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.formLogin.get('email')?.setValue(queryParams?.['email']);
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('display-centered');
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
    this.router.navigateByUrl('/dashboard');
  }
}
