import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ValidacoesForm } from 'src/app/utils/validacoes-form';

@Component({
  selector: 'app-without-input-text',
  templateUrl: './without-input-text.component.html',
  styleUrls: ['./without-input-text.component.scss'],
})
export class WithoutInputTextComponent implements OnInit {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() controlName: string = '';
  @Input() placeholder: string = '';
  @Input() inputName: string = '';
  @Input() typeForAutocomplete: string = 'on';
  @Input() maskInput?: string;
  @Input() placeHolder?: string = '';
  @Input() validacaoInput: boolean = false;

  @Output() emmiterFocus = new EventEmitter();
  @Output() emmiterBlur = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  inputFocus(type: any) {
    return this.emmiterFocus.emit(type);
  }

  emitterBlur(event: any) {
    return this.emmiterBlur.emit(event);
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
