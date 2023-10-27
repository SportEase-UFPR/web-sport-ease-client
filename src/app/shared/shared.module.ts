import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { InputCheckboxComponent } from './components/inputs/input-checkbox/input-checkbox.component';
import { LabelComponent } from './components/inputs/label/label.component';
import { BtnGreenComponent } from './components/buttons/btn-green/btn-green.component';
import { BtnBorderGreenComponent } from './components/buttons/btn-border-green/btn-border-green.component';
import { InputSenhaComponent } from './components/inputs/input-senha/input-senha.component';
import { InputEmailComponent } from './components/inputs/input-email/input-email.component';
import { InputTextComponent } from './components/inputs/input-text/input-text.component';
import { InputTextareaComponent } from './components/inputs/input-textarea/input-textarea.component';
import { InputSelectOptionComponent } from './components/inputs/input-select-option/input-select-option.component';
import { InputNumberComponent } from './components/inputs/input-number/input-number.component';
import { InputDateComponent } from './components/inputs/input-date/input-date.component';
import { BtnRedComponent } from './components/buttons/btn-red/btn-red.component';
import { InputStarRatingComponent } from './components/inputs/input-star-rating/input-star-rating.component';

@NgModule({
  declarations: [
    InputCheckboxComponent,
    LabelComponent,
    BtnGreenComponent,
    BtnBorderGreenComponent,
    InputSenhaComponent,
    InputEmailComponent,
    InputTextComponent,
    InputTextareaComponent,
    InputSelectOptionComponent,
    InputNumberComponent,
    InputDateComponent,
    BtnRedComponent,
    InputStarRatingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FontAwesomeModule,
  ],
  exports: [
    InputCheckboxComponent,
    InputSenhaComponent,
    BtnGreenComponent,
    BtnBorderGreenComponent,
    InputEmailComponent,
    InputTextComponent,
    InputTextareaComponent,
    InputSelectOptionComponent,
    InputNumberComponent,
    InputDateComponent,
    BtnRedComponent,
    InputStarRatingComponent,
  ],
  providers: [provideNgxMask()],
})
export class SharedModule {}
