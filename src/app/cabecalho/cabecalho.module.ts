import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabecalhoComponent } from './cabecalho.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CabecalhoComponent],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  exports: [CabecalhoComponent],
})
export class CabecalhoModule {}
