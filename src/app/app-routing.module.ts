import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './cadastro/formulario/formulario.component';
import { IntrucoesAtivacaoContaComponent } from './cadastro/intrucoes-ativacao-conta/intrucoes-ativacao-conta.component';

const routes: Routes = [
  {
    path: 'autocadastro',
    component: FormularioComponent,
  },

  {
    path: 'confirmacao-cadastro',
    component: IntrucoesAtivacaoContaComponent,
  },

  // {
  //   path: 'login',
  //   component: ,
  // },

  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },
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
