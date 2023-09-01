import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DetectarMobile } from 'src/app/utils/detectar-mobile';

@Component({
  selector: 'app-cadastrar-senha',
  templateUrl: './cadastrar-senha.component.html',
  styleUrls: ['./cadastrar-senha.component.scss'],
})
export class CadastrarSenhaComponent implements OnInit, OnDestroy {
  faInvalid = faXmark;
  faValid = faCheck;
  senhasDiferentes: boolean = false;
  passwordChecklist: boolean = false;
  focusPasswordType?: string;
  detectarMobile: DetectarMobile = new DetectarMobile();

  public formNovaSenha: FormGroup = new FormGroup({
    senha: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmacaoSenha: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    document.body.classList.add('display-centered');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('display-centered');
  }

  ngAfterContentChecked(): void {
    if (
      this.focusPasswordType === 'senha' ||
      this.focusPasswordType === 'confirmacaoSenha'
    ) {
      this.passwordChecklist = true;
    }

    const senha = this.formNovaSenha.get('senha');
    const confirmacaoSenha = this.formNovaSenha.get('confirmacaoSenha');

    if (
      senha?.value === confirmacaoSenha?.value &&
      senha?.value !== null &&
      confirmacaoSenha?.value !== null
    ) {
      this.senhasDiferentes = false;
    } else {
      this.senhasDiferentes = true;
    }
  }

  focusPassword(type: any) {
    this.focusPasswordType = type;
  }

  recuperarSenha() {
    //lógica para salvar a nova senha do cliente
    if (this.detectarMobile.isMobile()) {
    } else {
    }
  }
}
