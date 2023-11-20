import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ValidacoesForm } from 'src/app/utils/validacoes-form';
import { Item } from './model/item.model';

@Component({
  selector: 'app-input-select-option',
  templateUrl: './input-select-option.component.html',
  styleUrls: ['./input-select-option.component.scss'],
})
export class InputSelectOptionComponent implements OnInit {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() controlName?: any;
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() validacaoInput: boolean = false;
  @Input() items: Item[] = [];

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
