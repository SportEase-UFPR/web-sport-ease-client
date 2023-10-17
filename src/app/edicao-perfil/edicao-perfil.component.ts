import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ClienteService } from '../shared/services/cliente/cliente.service';
import { Cliente } from '../shared/models/cliente/cliente';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { ClienteAlteracaoRequest } from '../shared/models/cliente-alteracao/cliente-alteracao-request.model';
import { ModalConfirmacaoComponent } from './modal-confirmacao/modal-confirmacao.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteAlteracaoResponse } from '../shared/models/cliente-alteracao-response/cliente-alteracao-response.model';

@Component({
  selector: 'app-edicao-perfil',
  templateUrl: './edicao-perfil.component.html',
  styleUrls: ['./edicao-perfil.component.scss'],
})
export class EdicaoPerfilComponent implements OnInit, OnDestroy {
  public formAlteracaoPerfil: FormGroup = new FormGroup({
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
  senhasDiferentes: boolean = false;
  passwordChecklist: boolean = false;
  showInputGrr: boolean = false;
  isAluno: boolean = false;

  focusPasswordType?: string;
  cliente!: Cliente;
  inscricaoAtualizacao!: Subscription;
  inscricaoCliente!: Subscription;

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private toastrService: ToastrService,
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.inscricaoAtualizacao = this.clienteService
      .getDadosCliente()
      .subscribe({
        next: (result: Cliente) => {
          this.cliente = result;
          this.formAlteracaoPerfil.patchValue({
            nome: this.cliente.nome,
            email: this.cliente.email,
            cpf: this.maskCpf(this.cliente.cpf!),
            grr: this.haveGrr(this.cliente.grr!),
          });
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

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
      if (
        !this.passwordChecklist &&
        (senha?.touched || confirmacaoSenha?.touched)
      ) {
        this.passwordChecklist = true;
      }
    }
  }

  ngOnDestroy(): void {
    this.inscricaoAtualizacao?.unsubscribe();
    this.inscricaoCliente?.unsubscribe();
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

  navigate(): void {
    this.router.navigateByUrl('/dashboard');
  }

  showGrr(): void {
    const form = this.formAlteracaoPerfil;
    const grr = form.get('grr');
    if (form.get('vinculo')?.value) {
      this.showInputGrr = true;
      grr?.addValidators([Validators.required]);
      grr?.updateValueAndValidity();
    } else {
      this.showInputGrr = false;
      grr?.removeValidators([Validators.required]);
      grr?.updateValueAndValidity();
    }
  }

  maskCpf(cpf: string): string {
    return (
      cpf.slice(0, 3) +
      '.' +
      cpf.slice(3, 6) +
      '.' +
      cpf.slice(6, 9) +
      '-' +
      cpf.slice(9)
    );
  }

  haveGrr(grr: string | null): string | null {
    if (grr) {
      this.formAlteracaoPerfil.get('vinculo')?.setValue(true);
      this.showGrr();
      return grr;
    }
    this.isAluno = false;
    this.formAlteracaoPerfil.get('vinculo')?.setValue(false);
    return null;
  }

  alterarDados(): void {
    this.ngxService.startLoader('loader-01');
    const form = this.formAlteracaoPerfil;
    const nome = form.get('nome')?.value;
    const email = form.get('email')?.value;
    const vinculo = form.get('vinculo')?.value;
    const grr = form.get('grr')?.value;
    const senha = form.get('senha')?.value;
    if (
      nome !== this.cliente.nome ||
      email !== this.cliente.email ||
      // vinculo !== this.cliente.alunoUFPR ||
      // grr !== this.cliente.grr ||
      senha !== this.cliente.senha
    ) {
      const dadosCliente: ClienteAlteracaoRequest = new ClienteAlteracaoRequest(
        nome,
        email,
        senha ? senha : null
      );

      this.inscricaoAtualizacao = this.clienteService
        .atualizarDados(dadosCliente)
        .subscribe({
          next: (result: ClienteAlteracaoResponse) => {
            this.ngxService.stopLoader('loader-01');

            if (email !== this.cliente.email) {
              this.openModal(email);
            } else {
              this.toastrService.success(
                'Dados alterados com sucesso',
                'Sucesso!'
              );
              this.router.navigateByUrl('/dashboard');
            }
          },
          error: (err) => {
            this.ngxService.stopLoader('loader-01');
            this.toastrService.error(
              'Não foi possível atualziar o cadastro. Tente novamente mais tarde',
              'Falha ao atualziar os dados'
            );
          },
        });
    } else {
      this.ngxService.stopLoader('loader-01');
      this.toastrService.info(
        'Por favor, forneca pelo menos um dado que deseja atualziar',
        'Nenhum dado para atualizar'
      );
    }
  }

  openModal(email: string): void {
    const modalRef = this.modalService.open(ModalConfirmacaoComponent, {
      centered: true,
    });

    modalRef.componentInstance.email = email;
  }
}
