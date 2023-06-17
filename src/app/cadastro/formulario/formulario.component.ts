import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  public formCadastroCliente: FormGroup = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    cpf: new FormControl(null, [Validators.required]),
    vinculo: new FormControl(false),
    grr: new FormControl(null),
    senha: new FormControl(null, [Validators.required]),
    confirmacaoSenha: new FormControl(null, [Validators.required]),
  });

  showInputGrr: boolean = false;

  ngOnInit(): void {}

  constructor() {}

  showGrr(): void {
    if (this.formCadastroCliente.get('vinculo')?.value) {
      this.showInputGrr = true;
      this.formCadastroCliente.get('grr')?.addValidators([Validators.required]);
    } else {
      this.showInputGrr = false;
      this.formCadastroCliente
        .get('grr')
        ?.removeValidators([Validators.required]);
    }
  }
}
