import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { CardReservaComponent } from './card-reserva/card-reserva.component';
import { SharedModule } from '../shared/shared.module';
import { NgxUiLoaderConfig, NgxUiLoaderModule, POSITION, SPINNER } from 'ngx-ui-loader';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
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
    DashboardComponent,
    CardReservaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgbCollapseModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgxSkeletonLoaderModule
  ]
})
export class DashboardModule { }
