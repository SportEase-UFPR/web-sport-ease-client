import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { EspacosEsportivosComponent } from './espacos-esportivos/espacos-esportivos.component';
import { MinhasReservasComponent } from './minhas-reservas/minhas-reservas.component';
import { NovaReservaComponent } from './nova-reserva/nova-reserva.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guards/auth/auth.guard';

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
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  {
    path: 'espacos-esportivos',
    component: EspacosEsportivosComponent,
    canActivate: [authGuard]
  },

  {
    path: 'minhas-reservas',
    component: MinhasReservasComponent,
    canActivate: [authGuard]
  },

  {
    path: 'nova-reserva',
    component: NovaReservaComponent,
    canActivate: [authGuard]
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
