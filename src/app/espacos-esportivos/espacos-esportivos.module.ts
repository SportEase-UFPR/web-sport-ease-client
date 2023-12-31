import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspacosEsportivosComponent } from './espacos-esportivos.component';
import { CardEspacoEsportivoComponent } from './card-espaco-esportivo/card-espaco-esportivo.component';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderModule,
  POSITION,
  SPINNER,
} from 'ngx-ui-loader';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskPipe } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalAvaliacoesComponent } from './modal-avaliacoes/modal-avaliacoes.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

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
    EspacosEsportivosComponent,
    CardEspacoEsportivoComponent,
    ModalAvaliacoesComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    SharedModule,
    FontAwesomeModule,
    NgxMaskPipe,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule
  ],
})
export class EspacosEsportivosModule {}
