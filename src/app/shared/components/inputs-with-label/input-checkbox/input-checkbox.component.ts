import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ValidacoesForm } from 'src/app/utils/validacoes-form';

@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss'],
})
export class InputCheckboxComponent implements OnInit, AfterViewInit {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() value: any = 'SIM';
  @Input() controlName: string = '';
  @Input() inputChecked: boolean = false;
  @Input() validacaoInput: boolean = false;

  @Output() emmiterChange = new EventEmitter();

  @ViewChild('checkbox') element: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.inputChecked) {
      this.element.nativeElement.checked = true;
    } else {
      this.element.nativeElement.checked = false;
    }
  }

  get formControl(): AbstractControl {
    return this.formGroup?.controls[this.controlName] ?? new FormControl();
  }

  emiterChange(): void {
    return this.emmiterChange.emit();
  }

  inputValid(): boolean {
    return ValidacoesForm.inputInvalid(
      this.formGroup,
      this.controlName,
      this.validacaoInput
    );
  }
}
