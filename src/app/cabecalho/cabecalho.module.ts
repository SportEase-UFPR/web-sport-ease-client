import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabecalhoComponent } from './cabecalho.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [CabecalhoComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [CabecalhoComponent],
})
export class CabecalhoModule {}
