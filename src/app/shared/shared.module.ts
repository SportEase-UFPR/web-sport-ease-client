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
import { ClienteService } from './services/cliente/cliente.service';
import { SessionStorageService } from './services/session-storage/session-storage.service';

@NgModule({
  declarations: [
    InputCheckboxComponent,
    LabelComponent,
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
    InputSenhaComponent,
    BtnGreenComponent,
    BtnBorderGreenComponent,
    InputEmailComponent,
    InputTextComponent
  ],
  providers: [
    provideNgxMask(),
    SessionStorageService,
    ClienteService
  ],
})
export class SharedModule {}
