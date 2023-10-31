import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { EspacosEsportivosComponent } from './espacos-esportivos/espacos-esportivos.component';
import { MinhasReservasComponent } from './minhas-reservas/minhas-reservas.component';
import { NovaReservaComponent } from './nova-reserva/nova-reserva.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guards/auth/auth.guard';
import { EdicaoPerfilComponent } from './edicao-perfil/edicao-perfil.component';
import { AtivacaoEmailComponent } from './edicao-perfil/ativacao-email/ativacao-email.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { InstrucoesAtivacaoContaComponent } from './cadastro/instrucoes-ativacao-conta/instrucoes-ativacao-conta.component';
import { AtivacaoContaComponent } from './cadastro/ativacao-conta/ativacao-conta.component';
import { RecuperarSenhaComponent } from './login/recuperar-senha/recuperar-senha.component';
import { CadastrarSenhaComponent } from './login/cadastrar-senha/cadastrar-senha.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'ativar-email',
    component: AtivacaoEmailComponent,
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },

  {
    path: 'espacos-esportivos',
    component: EspacosEsportivosComponent,
    canActivate: [authGuard],
  },

  {
    path: 'minhas-reservas',
    component: MinhasReservasComponent,
    canActivate: [authGuard],
  },

  {
    path: 'nova-reserva',
    component: NovaReservaComponent,
    canActivate: [authGuard],
  },

  {
    path: 'editar-perfil',
    component: EdicaoPerfilComponent,
    canActivate: [authGuard],
  },

  {
    path: 'autocadastro',
    component: CadastroComponent,
  },

  {
    path: 'confirmacao-cadastro',
    component: InstrucoesAtivacaoContaComponent,
  },

  {
    path: 'ativar-conta',
    component: AtivacaoContaComponent
  },

  {
    path: 'recuperar-senha',
    component: RecuperarSenhaComponent
  },

  {
    path: 'cadastrar-senha',
    component: CadastrarSenhaComponent
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: '**',
    component: PageNotFoundComponent,
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
