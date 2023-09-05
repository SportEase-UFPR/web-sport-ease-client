import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { InstrucoesRecuperacaoResponse } from 'src/app/shared/models/instrucoes-recuperacao-response/instrucoes-recuperacao-response.model';
import { CadastroSenhaResponse } from 'src/app/shared/models/cadastro-senha-response/cadastro-senha-response.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  header = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private httpService: HttpClient) {}

  enviarIntrucoesRecuperacao(
    email: string
  ): Observable<InstrucoesRecuperacaoResponse> {
    return this.httpService.post<InstrucoesRecuperacaoResponse>(
      `${env.baseUrl}usuarios/email-recuperacao-senha`,
      JSON.stringify(email),
      { headers: this.header }
    );
  }

  alterarSenha(
    tokenUsuario: string,
    novaSenha?: string
  ): Observable<CadastroSenhaResponse> {
    return this.httpService.put<CadastroSenhaResponse>(
      `${env.baseUrl}usuarios/alterar-senha`,
      JSON.stringify({ tokenUsuario, novaSenha }),
      { headers: this.header }
    );
  }
}
