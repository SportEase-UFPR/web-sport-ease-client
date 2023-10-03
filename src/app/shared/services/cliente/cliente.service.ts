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
  header!: HttpHeaders;
  headerWithoutToken: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(
    private httpService: HttpClient,
    private ssService: SessionStorageService
  ) {
    const ssDados: UsuarioSs = ssService.get(env.ss_token);
    this.header = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: ssDados?.token!,
    });
  }

  getDadosCliente(): Observable<Cliente> {
    return this.httpService.get<Cliente>(
      `${env.baseUrl}clientes/cliente-logado`,
      {
        headers: this.header,
      }
    );
  }

  atualizarDados(
    cliente: ClienteAlteracaoRequest
  ): Observable<ClienteAlteracaoResponse> {
    return this.httpService.put<ClienteAlteracaoResponse>(
      `${env.baseUrl}clientes`,
      JSON.stringify(cliente),
      { headers: this.header }
    );
  }

  ativarEmail(token: EmailAtivacaoRequest): Observable<EmailAtivacaoResponse> {
    return this.httpService.put<EmailAtivacaoResponse>(
      `${env.baseUrl}clientes/alterar-email`,
      JSON.stringify(token),
      { headers: this.headerWithoutToken }
    );
  }
}
