import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CadastroModule } from './cadastro/cadastro.module';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginModule } from './login/login.module';
import { MenuComponent } from './menu/menu.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { EspacosEsportivosModule } from './espacos-esportivos/espacos-esportivos.module';
import { MinhasReservasModule } from './minhas-reservas/minhas-reservas.module';
import { NovaReservaModule } from './nova-reserva/nova-reserva.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { EdicaoPerfilModule } from './edicao-perfil/edicao-perfil.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CabecalhoModule } from './cabecalho/cabecalho.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CadastroModule,
    LoginModule,
    DashboardModule,
    EspacosEsportivosModule,
    MinhasReservasModule,
    NovaReservaModule,
    CabecalhoModule,
    SharedModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    EdicaoPerfilModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
