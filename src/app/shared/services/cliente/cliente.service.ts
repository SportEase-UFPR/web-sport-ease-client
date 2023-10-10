import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { UsuarioSs } from '../../models/usuario-ss/usuario-ss.model';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/cliente/cliente';
import { ClienteAlteracaoResponse } from '../../models/cliente-alteracao-response/cliente-alteracao-response.model';
import { ClienteAlteracaoRequest } from '../../models/cliente-alteracao/cliente-alteracao-request.model';
import { EmailAtivacaoRequest } from '../../models/email-ativacao-request/email-ativacao-request.model';
import { EmailAtivacaoResponse } from '../../models/email-ativacao-response/email-ativacao-response.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private headerWithoutToken: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(
    private httpService: HttpClient,
    private ssService: SessionStorageService
  ) {}

  getDadosCliente(): Observable<Cliente> {
    return this.httpService.get<Cliente>(
      `${env.baseUrlMsCadastros}clientes/cliente-logado`,
      {
        headers: this.createHeaders(),
      }
    );
  }

  atualizarDados(
    cliente: ClienteAlteracaoRequest
  ): Observable<ClienteAlteracaoResponse> {
    return this.httpService.put<ClienteAlteracaoResponse>(
      `${env.baseUrlMsCadastros}clientes`,
      JSON.stringify(cliente),
      { headers: this.createHeaders() }
    );
  }

  ativarEmail(token: EmailAtivacaoRequest): Observable<EmailAtivacaoResponse> {
    return this.httpService.put<EmailAtivacaoResponse>(
      `${env.baseUrlMsCadastros}clientes/alterar-email`,
      JSON.stringify(token),
      { headers: this.headerWithoutToken }
    );
  }

  private createHeaders(): HttpHeaders {
    const ssDados: UsuarioSs = this.ssService.get(env.ss_token);

    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: ssDados?.token!,
    });
  }
}
