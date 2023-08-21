import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    document.body.classList.add('display-centered');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('display-centered');
  }

  entrar() {
    this.router.navigateByUrl('/dashboard')
  }
}
