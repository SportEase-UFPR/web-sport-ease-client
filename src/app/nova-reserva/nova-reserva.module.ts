import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

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
  declarations: [NovaReservaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class NovaReservaModule {}
