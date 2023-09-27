import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ValidacoesForm } from 'src/app/utils/validacoes-form';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent implements OnInit, AfterViewInit {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() controlName?: any;
  @Input() placeholder: string = '';
  @Input() mask: string = '';
  @Input() label: string = '';
  @Input() validacaoInput: boolean = false;
  @Input() isDisabled: boolean = false;

  @ViewChild('inputText') inputText!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.isDisabled) {
      if (this.inputText) {
        this.inputText.nativeElement.disabled = true;
      }
    }
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
