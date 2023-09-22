import { FormGroup } from '@angular/forms';

export class ValidacoesForm {
  static inputInvalid(
    form: FormGroup,
    name: string,
    validation: boolean
  ): boolean {
    if (
      form.controls[name].invalid &&
      (form.controls[name].dirty || form.controls[name].touched) &&
      validation
    ) {
      return true;
    }
    return false;
  }
}
