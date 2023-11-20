import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-password-checklist',
  templateUrl: './password-checklist.component.html',
  styleUrls: ['./password-checklist.component.scss'],
})
export class PasswordChecklistComponent implements OnInit {
  @Input() control?: AbstractControl;
  @Input() senhasDiferentes: boolean = true;

  faInvalid = faXmark;
  faValid = faCheck;

  constructor() {}

  ngOnInit(): void {}

  passwordValid(): boolean {
    if (
      this.control?.hasError('required') ||
      this.control?.hasError('minlength')
    ) {
      return true;
    }
    return false;
  }
}
