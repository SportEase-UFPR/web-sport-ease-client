import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-without-input-email',
  templateUrl: './without-input-email.component.html',
  styleUrls: ['./without-input-email.component.scss'],
})
export class WithoutInputEmailComponent implements OnInit {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() placeholder: string = '';
  @Input() inputName: string = '';
  @Input() controlName: string = '';
  @Input() placeHolder?: string = '';
  @Input() validacaoInput: boolean = false;

  @Output() emmiterChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  get formControl(): AbstractControl {
    return this.formGroup?.controls[this.controlName] ?? new FormControl();
  }

  changeInput(data: any): void {
    return this.emmiterChange.emit(data);
  }
}
