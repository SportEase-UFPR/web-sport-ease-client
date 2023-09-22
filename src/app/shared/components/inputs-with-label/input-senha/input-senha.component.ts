import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { ValidacoesForm } from 'src/app/utils/validacoes-form';

@Component({
  selector: 'app-input-senha',
  templateUrl: './input-senha.component.html',
  styleUrls: ['./input-senha.component.scss']
})
export class InputSenhaComponent implements OnInit {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() controlName?: any;
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() validacaoInput: boolean = false;

  @Output() emmiterFocus = new EventEmitter();

  @ViewChild('sectionInputPassword') sectionInputPassword!: ElementRef;

  faShowSenha = faEye;

  senha: boolean = false;
  type: string = 'password';

  constructor() {}

  ngOnInit(): void {}

  // define se mostra a senha ou não
  showSenha() {
    if (this.senha) {
      this.faShowSenha = faEye;
      this.type = 'password';
      this.senha = false;
    } else {
      this.faShowSenha = faEyeSlash;
      this.type = 'text';
      this.senha = true;
    }
  }

  inputFocus() {
    return this.emmiterFocus.emit();
  }

  passwordFocus(){
    this.sectionInputPassword.nativeElement.classList.toggle(
      'section-input-password-focus'
    );
  }

  get formControl(): AbstractControl {
    return this.formGroup?.controls[this.controlName] ?? new FormControl();
  }

  inputValid(): boolean {
    return ValidacoesForm.inputInvalid(
      this.formGroup,
      this.controlName,
      this.validacaoInput
    );
  }
}
