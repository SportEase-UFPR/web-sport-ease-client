import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-without-input-senha',
  templateUrl: './without-input-senha.component.html',
  styleUrls: ['./without-input-senha.component.scss'],
})
export class WithoutInputSenhaComponent implements OnInit {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() controlName?: any;
  @Input() placeholder: string = '';
  @Input() validacaoInput: boolean = false;

  @Output() emmiterFocus = new EventEmitter();

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

  inputFocus(type: any) {
    return this.emmiterFocus.emit(type);
  }

  get formControl(): AbstractControl {
    return this.formGroup?.controls[this.controlName] ?? new FormControl();
  }
}
