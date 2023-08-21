import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './cadastro/formulario/formulario.component';
import { IntrucoesAtivacaoContaComponent } from './cadastro/intrucoes-ativacao-conta/intrucoes-ativacao-conta.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './dashboard/home/home.component';
import { EspacosEsportivosComponent } from './espacos-esportivos/espacos-esportivos/espacos-esportivos.component';
import { MinhasReservasComponent } from './minhas-reservas/minhas-reservas/minhas-reservas.component';
import { NovaReservaComponent } from './nova-reserva/nova-reserva/nova-reserva.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'autocadastro',
    component: FormularioComponent,
  },

  {
    path: 'confirmacao-cadastro',
    component: IntrucoesAtivacaoContaComponent,
  },

  {
    path: 'dashboard',
    component: HomeComponent,
  },

  {
    path: 'espacos-esportivos',
    component: EspacosEsportivosComponent
  },

  {
    path: 'minhas-reservas',
    component: MinhasReservasComponent
  },

  {
    path: 'nova-reserva',
    component: NovaReservaComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
