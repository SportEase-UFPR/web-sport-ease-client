import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LabelComponent } from './components/inputs/label/label.component';
import { BtnGreenComponent } from './components/buttons/btn-green/btn-green.component';
import { BtnBorderGreenComponent } from './components/buttons/btn-border-green/btn-border-green.component';
import { InputSenhaComponent } from './components/inputs/input-senha/input-senha.component';
import { InputTextareaComponent } from './components/inputs/input-textarea/input-textarea.component';
import { InputSelectOptionComponent } from './components/inputs/input-select-option/input-select-option.component';
import { BtnRedComponent } from './components/buttons/btn-red/btn-red.component';
import { InputStarRatingComponent } from './components/inputs/input-star-rating/input-star-rating.component';
import { InputFieldComponent } from './components/inputs/input-field/input-field.component';
import { InputToogleComponent } from './components/inputs/input-toogle/input-toogle.component';
import { PasswordChecklistComponent } from './components/password-checklist/password-checklist.component';
import { RatingComponent } from './components/rating/rating.component';

@NgModule({
  declarations: [
    LabelComponent,
    BtnGreenComponent,
    BtnBorderGreenComponent,
    InputSenhaComponent,
    InputTextareaComponent,
    InputSelectOptionComponent,
    BtnRedComponent,
    InputStarRatingComponent,
    InputFieldComponent,
    InputToogleComponent,
    PasswordChecklistComponent,
    RatingComponent
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
    InputSenhaComponent,
    BtnGreenComponent,
    BtnBorderGreenComponent,
    InputTextareaComponent,
    InputSelectOptionComponent,
    BtnRedComponent,
    InputStarRatingComponent,
    InputFieldComponent,
    InputToogleComponent,
    PasswordChecklistComponent,
    RatingComponent
  ],
  providers: [provideNgxMask()],
})
export class SharedModule {}
