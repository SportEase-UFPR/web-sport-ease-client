import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-without-input-number',
  templateUrl: './without-input-number.component.html',
  styleUrls: ['./without-input-number.component.scss'],
})
export class WithoutInputNumberComponent implements OnInit {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() placeholder: string = '';
  @Input() controlName?: any;
  @Input() maskInput?: any;
  @Input() placeHolder?: string = '';
  @Input() validacaoInput: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  get formControl(): AbstractControl {
    return this.formGroup?.controls[this.controlName] ?? new FormControl();
  }
}
