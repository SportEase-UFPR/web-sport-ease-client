import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidacoesForm } from 'src/app/utils/validacoes-form';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements OnInit {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() controlName?: any;
  @Input() placeholder: string = '';
  @Input() inputType: string = 'text';
  @Input() label: string = '';
  @Input() mask?: string;
  @Input() validacaoInput: boolean = false;

  @Output() emitterChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  // get formControl(): AbstractControl {
  //   return this.formGroup?.controls[this.controlName] ?? new FormControl();
  // }

  inputValid(): boolean {
    return ValidacoesForm.inputInvalid(
      this.formGroup,
      this.controlName,
      this.validacaoInput
    );
  }

  onChange() {
    this.emitterChange.emit();
  }
}
