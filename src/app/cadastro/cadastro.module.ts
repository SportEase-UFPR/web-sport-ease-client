import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IntrucoesAtivacaoContaComponent } from './intrucoes-ativacao-conta/intrucoes-ativacao-conta.component';
import { SharedModule } from '../shared/shared.module';
import { CadastroService } from './services/cadastro.service';
import { CadastroComponent } from './cadastro.component';
import { CadastroRoutingModule } from './cadastro-routing.module';
import { AtivacaoContaComponent } from './ativacao-conta/ativacao-conta.component';

@NgModule({
  declarations: [IntrucoesAtivacaoContaComponent, CadastroComponent, AtivacaoContaComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CadastroRoutingModule,
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
