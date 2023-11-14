import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NovaReservaComponent } from './nova-reserva.component';
import { SharedModule } from '../shared/shared.module';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderModule,
  POSITION,
  SPINNER,
} from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ModalInfoComponent } from './modal-info/modal-info.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
  declarations: [NovaReservaComponent, ModalInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    FontAwesomeModule
  ],
})
export class NovaReservaModule {}
