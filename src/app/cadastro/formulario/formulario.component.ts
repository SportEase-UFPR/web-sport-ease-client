import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit, AfterContentChecked {
  public formCadastroCliente: FormGroup = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    cpf: new FormControl(null, [Validators.required]),
    vinculo: new FormControl(false),
    grr: new FormControl(null),
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

  showInputGrr: boolean = false;
  senhasDiferentes: boolean = false;
  passwordChecklist: boolean = false;

  focusPasswordType?: string;

  ngOnInit(): void {}

  constructor(private router: Router) {}

  ngAfterContentChecked(): void {
    if (
      this.focusPasswordType === 'senha' ||
      this.focusPasswordType === 'confirmacaoSenha'
    ) {
      this.passwordChecklist = true;
    }

    if (
      this.formCadastroCliente.get('senha')?.value ===
      this.formCadastroCliente.get('confirmacaoSenha')?.value &&
      this.formCadastroCliente.get('senha')?.value !== null &&
      this.formCadastroCliente.get('confirmacaoSenha')?.value !== null
    ) {
      this.senhasDiferentes = false
    } else {
      this.senhasDiferentes = true
    }

  }

  focusPassword(type: any) {
    this.focusPasswordType = type;
  }

  showGrr(): void {
    if (this.formCadastroCliente.get('vinculo')?.value) {
      this.showInputGrr = true;
      this.formCadastroCliente.get('grr')?.addValidators([Validators.required]);
    } else {
      this.showInputGrr = false;
      this.formCadastroCliente
        .get('grr')
        ?.removeValidators([Validators.required]);
    }
  }

  cadastrar(){
    this.router.navigateByUrl('/confirmacao-cadastro');
  }
}
