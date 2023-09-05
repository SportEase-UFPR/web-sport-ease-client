import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { CadastroService } from './services/cadastro.service';
import { Cliente } from '../shared/models/cliente/cliente';
import { Validacoes } from '../utils/validacoes';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent
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
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cadastroService: CadastroService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    document.body.classList.add('display-centered');
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.formCadastroCliente.get('email')?.setValue(queryParams?.['email']);
    });
  }

  ngAfterContentChecked(): void {
    if (
      this.focusPasswordType === 'senha' ||
      this.focusPasswordType === 'confirmacaoSenha'
    ) {
      this.passwordChecklist = true;
    }

    const form = this.formCadastroCliente;
    const senha = form.get('senha');
    const confirmacaoSenha = form.get('confirmacaoSenha');

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

  validarCpf() {
    const cpf = this.formCadastroCliente.get('cpf');
    if (!Validacoes.isValidCpf(cpf?.value)) {
      this.toastrService.warning(
        'Por favor, informe um CPF válido.',
        'CPF Incorreto'
      );
      cpf?.setValue(null);
    }
  }

  cadastrar() {
    this.ngxService.startLoader('loader-01');
    const form = this.formCadastroCliente;

    if (form.valid && !this.senhasDiferentes) {
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
          this.ngxService.stopLoader('loader-01');
          this.router.navigateByUrl('/confirmacao-cadastro');
        },

        error: (err) => {
          this.ngxService.stopLoader('loader-01');
          this.toastrService.error(
            err.error?.errors?.[0]?.message ||
              err.error?.message ||
              'Não foi possível realizar o cadastro. Tente novamente mais tarde',
            'Erro'
          );
        },
      });
    } else {
      this.ngxService.stopLoader('loader-01');
      this.toastrService.warning(
        'Por favor, preencha todos os campos do formulário corretamente',
        'Impossível realizar o cadastro'
      );
    }
  }

  navigate() {
    this.router.navigateByUrl('/login');
  }
}
