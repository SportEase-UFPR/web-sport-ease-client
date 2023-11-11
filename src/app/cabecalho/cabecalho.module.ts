import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabecalhoComponent } from './cabecalho.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [CabecalhoComponent],
  imports: [CommonModule, FontAwesomeModule, RouterModule, NgxSkeletonLoaderModule],
  exports: [CabecalhoComponent],
})
export class CabecalhoModule {}
