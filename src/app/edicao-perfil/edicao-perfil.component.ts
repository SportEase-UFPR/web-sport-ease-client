import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ClienteService } from '../shared/services/cliente/cliente.service';
import { Cliente } from '../shared/models/cliente/cliente';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject, take, takeUntil } from 'rxjs';
import { ClienteAlteracaoRequest } from '../shared/models/cliente/cliente-alteracao-request.model';
import { ModalConfirmacaoComponent } from './modal-confirmacao/modal-confirmacao.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteAlteracaoResponse } from '../shared/models/cliente/cliente-alteracao-response.model';
import { ValidacoesForm } from '../utils/validacoes-form';

@Component({
  selector: 'app-edicao-perfil',
  templateUrl: './edicao-perfil.component.html',
  styleUrls: ['./edicao-perfil.component.scss'],
})
export class EdicaoPerfilComponent implements OnInit, OnDestroy {
  public formAlteracaoPerfil: FormGroup = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    cpf: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
    vinculo: new FormControl(false),
    grr: new FormControl({ value: null, disabled: false }),
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
  senhasDiferentes: boolean = true;
  passwordChecklist: boolean = false;
  showInputGrr: boolean = false;
  isAluno: boolean = false;

  focusPasswordType?: string;
  cliente!: Cliente;

  vinculo$ = new Subject();
  senha$ = new Subject();
  confirmacaoSenha$ = new Subject();

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private toastrService: ToastrService,
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.clienteService
      .getDadosCliente()
      .pipe(take(1))
      .subscribe({
        next: (result: Cliente) => {
          this.cliente = result;
          this.formAlteracaoPerfil.patchValue({
            nome: this.cliente.nome,
            email: this.cliente.email,
            cpf: this.cliente.cpf,
            grr: this.haveGrr(this.cliente.grr!),
          });
        },
        error: (err) => {
          console.error(err);
        },
      });

    this.formAlteracaoPerfil
      .get('vinculo')
      ?.valueChanges.pipe(takeUntil(this.vinculo$))
      .subscribe((value) => this.showGrr(value));

    this.formAlteracaoPerfil
      .get('senha')
      ?.valueChanges.pipe(takeUntil(this.senha$))
      .subscribe(() => this.verificarSenhas());

    this.formAlteracaoPerfil
      .get('confirmacaoSenha')
      ?.valueChanges.pipe(takeUntil(this.confirmacaoSenha$))
      .subscribe(() => this.verificarSenhas());
  }

  ngOnDestroy(): void {
    this.vinculo$.next(null);
    this.senha$.next(null);
    this.confirmacaoSenha$.next(null);
    this.vinculo$.complete();
    this.senha$.complete();
    this.confirmacaoSenha$.complete();
  }

  verificarSenhas() {
    const result = ValidacoesForm.senhasValid(
      this.formAlteracaoPerfil.get('senha')!,
      this.formAlteracaoPerfil.get('confirmacaoSenha')!,
      this.passwordChecklist
    );
    this.passwordChecklist = result;
    this.senhasDiferentes = result;
  }

  focusPassword() {
    this.passwordChecklist = true;
  }

  navigate(): void {
    this.router.navigateByUrl('/dashboard');
  }

  showGrr(show: boolean): void {
    const form = this.formAlteracaoPerfil;
    const grr = form.get('grr');
    if (show) {
      this.showInputGrr = true;
      grr?.addValidators([Validators.required]);
      grr?.updateValueAndValidity();
    } else {
      this.showInputGrr = false;
      grr?.removeValidators([Validators.required]);
      grr?.updateValueAndValidity();
    }
  }

  haveGrr(grr: string | null): string | null {
    if (grr) {
      this.formAlteracaoPerfil.get('vinculo')?.setValue(true);
      this.showGrr(true);
      this.formAlteracaoPerfil.get('grr')?.disable();
      return grr;
    }
    this.isAluno = false;
    this.formAlteracaoPerfil.get('grr')?.enable();
    this.formAlteracaoPerfil.get('vinculo')?.setValue(false);
    return null;
  }

  alterarDados(): void {
    const form = this.formAlteracaoPerfil;
    const nome = form.get('nome')?.value;
    const email = form.get('email')?.value;
    const vinculo = form.get('vinculo')?.value;
    let grr = form.get('grr')?.value;
    const senha = form.get('senha')?.value;

    grr = vinculo ? (grr?.includes('GRR') ? grr : `GRR${grr}`) : null;

    if (
      nome !== this.cliente.nome ||
      email !== this.cliente.email ||
      grr !== this.cliente.grr ||
      senha
    ) {
      const dadosCliente: ClienteAlteracaoRequest = new ClienteAlteracaoRequest(
        nome,
        email,
        senha ? senha : null,
        vinculo,
        grr
      );

      if (senha) {
        this.verificarSenhas();

        if (this.formAlteracaoPerfil.get('senha')?.invalid) {
          this.toastrService.warning(
            'Por favor, a senha deve atender as regras',
            'Senha está com um formato incorreto'
          );
        }

        if (this.formAlteracaoPerfil.get('confirmacaoSenha')?.invalid) {
          this.toastrService.warning(
            'Por favor, a confimmação da senha deve atender as regras',
            'Confirmação da senha está com um formato incorreto'
          );
        }

        if (this.senhasDiferentes) {
          this.toastrService.warning(
            'Por favor, a senha e a confirmação da senha devem ser idênticas',
            'As senhas não são idênticas'
          );
        } else {
          this.enviarDados(dadosCliente, email);
        }
      } else {
        this.enviarDados(dadosCliente, email);
      }
    } else {
      this.ngxService.stopLoader('loader-01');
      this.toastrService.info(
        'Por favor, forneca pelo menos um dado que deseja atualizar',
        'Nenhum dado para atualizar'
      );
    }
  }

  enviarDados(dadosCliente: ClienteAlteracaoRequest, email: string) {
    this.ngxService.startLoader('loader-01');
    this.clienteService
      .atualizarDados(dadosCliente)
      .pipe(take(1))
      .subscribe({
        next: (result: ClienteAlteracaoResponse) => {
          this.ngxService.stopLoader('loader-01');

          if (email !== this.cliente.email) {
            this.openModal(email);
          } else {
            this.toastrService.success(
              'Dados alterados com sucesso',
              'Sucesso'
            );
            this.router.navigateByUrl('/dashboard');
          }
        },
        error: (err) => {
          this.ngxService.stopLoader('loader-01');
          this.toastrService.error(
            err.error.message ??
              'Não foi possível atualizar o cadastro. Tente novamente mais tarde',
            'Falha ao atualizar os dados'
          );
        },
      });
  }

  openModal(email: string): void {
    const modalRef = this.modalService.open(ModalConfirmacaoComponent, {
      centered: true,
    });

    modalRef.componentInstance.email = email;
  }
}
