import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { SessionStorageService } from 'src/app/shared/services/session-storage/session-storage.service';
import { environment as env } from '../../../environments/environment';
import { UsuarioSs } from 'src/app/shared/models/usuario-ss/usuario-ss.model';
import { ToastrService } from 'ngx-toastr';
import { Token } from 'src/app/shared/models/token/token.model';
import { JwtDecode } from 'src/app/utils/jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const ssService: SessionStorageService = inject(SessionStorageService);
  const ssToken = env.ss_token;
  const ssDados: UsuarioSs = ssService.get(ssToken);
  const router: Router = inject(Router);
  const toastrService: ToastrService = inject(ToastrService);

  const userNotLogado = (titulo: string, msg: string) => {
    toastrService.warning(msg, titulo);
    ssService.remove(ssToken);
    router.navigateByUrl('/login');
  };

  if (ssDados) {
    if (ssDados.usuarioLogado) {
      const token: Token = JwtDecode.decode(ssDados.token!);
      if (token.userProfile !== env.userProfile) {
        userNotLogado(
          'Você não pode acessar o site',
          'Seu perfil não tem acesso a esse site'
        );
        return false;
      }
    } else {
      userNotLogado(
        'Usuário não está logado',
        'Você deve estar logado para acessar nosso sistema. Por favor, faça o login'
      );
      return false;
    }
  } else {
    userNotLogado(
      'Usuário não está logado',
      'Você deve estar logado para acessar nosso sistema. Por favor, faça o login'
    );
    return false;
  }

  return true;
};
