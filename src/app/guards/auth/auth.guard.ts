import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { environment as env } from '../../../environments/environment';
import { UsuarioLs } from 'src/app/shared/models/usuario-ls/usuario-ls.model';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';
import { Token } from 'src/app/shared/models/token/token.model';

export const authGuard: CanActivateFn = (route, state) => {
  const lsService: LocalStorageService = inject(LocalStorageService);
  const lsToken = env.ls_token;
  const lsDados: UsuarioLs = lsService.get(lsToken);
  const router: Router = inject(Router);
  const toastrService: ToastrService = inject(ToastrService);

  const userNotLogado = () => {
    toastrService.warning(
      'Você deve estar logado para acessar nosso sistema. Por favor, faça o login',
      'Usuário não está logado'
    );
    lsService.remove(lsToken)
    router.navigateByUrl('/login');
  };

  if (lsDados) {
    if (lsDados.usuarioLogado) {
      const token: Token = jwt_decode(lsDados.token!);
      if (token.userProfile !== env.userProfile) {
        userNotLogado();
      }
    } else {
      userNotLogado();
    }
  } else {
    userNotLogado();
  }

  return true;
};
