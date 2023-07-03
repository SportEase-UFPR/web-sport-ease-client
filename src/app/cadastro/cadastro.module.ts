import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormularioComponent } from './formulario/formulario.component';
import { IntrucoesAtivacaoContaComponent } from './intrucoes-ativacao-conta/intrucoes-ativacao-conta.component';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { CadastroService } from './services/cadastro.service';

@NgModule({
  declarations: [FormularioComponent, IntrucoesAtivacaoContaComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FontAwesomeModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [provideNgxMask(), CadastroService],
})
export class CadastroModule {}
