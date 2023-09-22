import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edicao-perfil',
  templateUrl: './edicao-perfil.component.html',
  styleUrls: ['./edicao-perfil.component.scss'],
})
export class EdicaoPerfilComponent implements OnInit {
  public formAlteracaoPerfil: FormGroup = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    cpf: new FormControl(null),
    senha: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmacaoSenha: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  faInvalid = faXmark;
  faValid = faCheck;
  senhasDiferentes: boolean = false;
  passwordChecklist: boolean = false;
  focusPasswordType?: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngAfterContentChecked(): void {
    const senha = this.formAlteracaoPerfil.get('senha');
    const confirmacaoSenha = this.formAlteracaoPerfil.get('confirmacaoSenha');

    if (
      senha?.value === confirmacaoSenha?.value &&
      senha?.value !== null &&
      confirmacaoSenha?.value !== null &&
      senha?.value !== '' &&
      confirmacaoSenha?.value !== ''
    ) {
      this.senhasDiferentes = false;
      if (senha?.valid && confirmacaoSenha?.valid) {
        this.passwordChecklist = false;
      }
    } else {
      this.senhasDiferentes = true;
      if (!this.passwordChecklist) {
        this.passwordChecklist = true;
      }
    }
  }

  focusPassword() {
    this.passwordChecklist = true;
  }

  passwordValid(campo: string): boolean {
    if (
      this.formAlteracaoPerfil.controls[campo].hasError('required') ||
      this.formAlteracaoPerfil.controls[campo].hasError('minlength')
    ) {
      return true;
    }
    return false;
  }

  alterarDados(): void {}

  navigate(): void {
    this.router.navigateByUrl('/dashboard')
  }
}
