import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CabecalhoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CadastroModule,
    LoginModule,
    EspacosEsportivosModule,
    MinhasReservasModule,
    NovaReservaModule,
    SharedModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
