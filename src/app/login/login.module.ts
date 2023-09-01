import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { CadastrarSenhaComponent } from './cadastrar-senha/cadastrar-senha.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    LoginComponent,
    RecuperarSenhaComponent,
    CadastrarSenhaComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
