import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CadastroService } from '../services/cadastro.service';
import { Cliente } from 'src/app/shared/models/cliente/cliente';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent
  implements OnInit, AfterContentChecked, OnDestroy
{
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

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private cadastroService: CadastroService
  ) {}

  ngOnInit(): void {
    document.body.classList.add('display-centered');
  }

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
      this.senhasDiferentes = false;
    } else {
      this.senhasDiferentes = true;
    }
  }

  ngOnDestroy(): void {
    document.body.classList.remove('display-centered');
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

  cadastrar() {
    const form = this.formCadastroCliente;

    const newCliente: Cliente = new Cliente(
      0,
      form.get('nome')?.value,
      form.get('email')?.value,
      form.get('cpf')?.value,
      form.get('vinculo')?.value,
      form.get('grr')?.value,
      form.get('senha')?.value
    );

    if (newCliente.alunoUFPR) {
      newCliente.grr = `GRR${newCliente.grr}`;
    } else {
      newCliente.grr = null;
    }

    this.cadastroService.cadastrar(newCliente).subscribe({
      next: (result) => {
        this.router.navigateByUrl('/confirmacao-cadastro');
      },

      error: (err) => {
        this.toastrService.error(
          err.error?.errors?.[0]?.message ||
            err.error?.message ||
            'Não foi possível realizar o cadastro. Tente novamente mais tarde',
          'Erro'
        );
      },
    });
  }
}
