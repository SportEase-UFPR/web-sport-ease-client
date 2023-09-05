import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { InstrucoesRecuperacaoResponse } from 'src/app/shared/models/instrucoes-recuperacao-response/instrucoes-recuperacao-response.model';
import { CadastroSenhaResponse } from 'src/app/shared/models/cadastro-senha-response/cadastro-senha-response.model';
import { InstrucoesRecuperacaoRequest } from 'src/app/shared/models/instrucoes-recuperacao-request/instrucoes-recuperacao-request.model';
import { CadastroSenhaRequest } from 'src/app/shared/models/cadastro-senha-request/cadastro-senha-request.model';
import { LoginResponse } from 'src/app/shared/models/login-response/login-response.model';
import { LoginRequest } from 'src/app/shared/models/login-request/login-request.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { UsuarioLs } from 'src/app/shared/models/usuario-ls/usuario-ls.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  header = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private httpService: HttpClient, private lsService: LocalStorageService) {}

  enviarIntrucoesRecuperacao(
    dados: InstrucoesRecuperacaoRequest
  ): Observable<InstrucoesRecuperacaoResponse> {
    return this.httpService.post<InstrucoesRecuperacaoResponse>(
      `${env.baseUrl}usuarios/email-recuperacao-senha`,
      JSON.stringify(dados),
      { headers: this.header }
    );
  }

  alterarSenha(dados: CadastroSenhaRequest): Observable<CadastroSenhaResponse> {
    return this.httpService.put<CadastroSenhaResponse>(
      `${env.baseUrl}usuarios/alterar-senha`,
      JSON.stringify(dados),
      { headers: this.header }
    );
  }

  login(dados: LoginRequest): Observable<LoginResponse> {
    return this.httpService.post<LoginResponse>(
      `${env.baseUrl}login`,
      JSON.stringify(dados),
      { headers: this.header }
    );
  }

  logout(): boolean{
    return this.lsService.remove(env.ls_token)
  }

  setUsuarioLogado(dados: LoginResponse){
    const dadosLs: UsuarioLs = new UsuarioLs(dados.token, true)
    this.lsService.set(env.ls_token, dadosLs)
  }
}
