import { AbstractControl, FormGroup } from '@angular/forms';

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

  static senhasValid(
    senhaField: AbstractControl,
    confirmacaoSenhaField: AbstractControl,
    passwordChecklist: boolean
  ): boolean {
    const senha = senhaField;
    const confirmacaoSenha = confirmacaoSenhaField;

    if (
      senha?.value &&
      confirmacaoSenha?.value &&
      senha?.value !== '' &&
      confirmacaoSenha?.value !== '' &&
      senha?.value === confirmacaoSenha?.value
    ) {
      if (senha?.valid && confirmacaoSenha?.valid) {
        return false;
      }
    } else {
      if (!passwordChecklist && (senha?.touched || confirmacaoSenha?.touched)) {
        return true;
      }
    }

    return true;
  }
}
