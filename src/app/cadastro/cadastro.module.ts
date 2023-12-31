import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { InstrucoesAtivacaoContaComponent } from './instrucoes-ativacao-conta/instrucoes-ativacao-conta.component';
import { SharedModule } from '../shared/shared.module';
import { CadastroComponent } from './cadastro.component';
import { AtivacaoContaComponent } from './ativacao-conta/ativacao-conta.component';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderModule,
  PB_DIRECTION,
  POSITION,
  SPINNER,
} from 'ngx-ui-loader';
import { RouterModule } from '@angular/router';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#0fd45e',
  bgsPosition: POSITION.centerCenter,
  bgsSize: 40,
  bgsType: SPINNER.ballSpinClockwise,
  fgsType: SPINNER.ballSpin,
  fgsColor: '#0fd45e',
  blur: 10,
  overlayColor: 'rgba(255,255,255,0.5)',
  hasProgressBar: false,
};

@NgModule({
  declarations: [
    InstrucoesAtivacaoContaComponent,
    CadastroComponent,
    AtivacaoContaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FontAwesomeModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [provideNgxMask()],
})
export class CadastroModule {}
