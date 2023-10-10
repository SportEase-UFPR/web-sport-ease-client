import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ValidacoesForm } from 'src/app/utils/validacoes-form';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent implements OnInit {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() controlName?: any;
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() validacaoInput: boolean = false;

  @Output() emitterChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

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

  onChange() {
    this.emitterChange.emit();
  }
}
