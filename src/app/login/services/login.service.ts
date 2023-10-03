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
import { SessionStorageService } from 'src/app/shared/services/session-storage/session-storage.service';
import { UsuarioSs } from 'src/app/shared/models/usuario-ss/usuario-ss.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  header = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private httpService: HttpClient, private ssService: SessionStorageService) {}

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
    return this.ssService.remove(env.ss_token)
  }

  setUsuarioLogado(dados: LoginResponse){
    const dadosLs: UsuarioSs = new UsuarioSs(dados.token, true)
    this.ssService.set(env.ss_token, dadosLs)
  }
}
