import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { InputCheckboxComponent } from './components/inputs-with-label/input-checkbox/input-checkbox.component';
import { LabelComponent } from './components/inputs-with-label/label/label.component';
import { WithoutInputTextComponent } from './components/inputs-without-label/without-input-text/without-input-text.component';
import { WithoutInputNumberComponent } from './components/inputs-without-label/without-input-number/without-input-number.component';
import { WithoutInputEmailComponent } from './components/inputs-without-label/without-input-email/without-input-email.component';
import { BtnGreenComponent } from './components/buttons/btn-green/btn-green.component';
import { BtnBorderGreenComponent } from './components/buttons/btn-border-green/btn-border-green.component';
import { InputSenhaComponent } from './components/inputs-with-label/input-senha/input-senha.component';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { InputEmailComponent } from './components/inputs-with-label/input-email/input-email.component';
import { InputTextComponent } from './components/inputs-with-label/input-text/input-text.component';

@NgModule({
  declarations: [
    InputCheckboxComponent,
    LabelComponent,
    WithoutInputTextComponent,
    WithoutInputNumberComponent,
    WithoutInputEmailComponent,
    BtnGreenComponent,
    BtnBorderGreenComponent,
    InputSenhaComponent,
    InputEmailComponent,
    InputTextComponent
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
    WithoutInputTextComponent,
    WithoutInputNumberComponent,
    WithoutInputEmailComponent,
    InputSenhaComponent,
    BtnGreenComponent,
    BtnBorderGreenComponent,
    InputEmailComponent,
    InputTextComponent
  ],
  providers: [
    provideNgxMask(),
    LocalStorageService
  ],
})
export class SharedModule {}
