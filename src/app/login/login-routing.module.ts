import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecuperarSenhaComponent } from "./recuperar-senha/recuperar-senha.component";
import { CadastrarSenhaComponent } from "./cadastrar-senha/cadastrar-senha.component";

const routes: Routes = [
  {
    path: 'recuperar-senha',
    component: RecuperarSenhaComponent
  },

  {
    path: 'cadastrar-senha',
    component: CadastrarSenhaComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
