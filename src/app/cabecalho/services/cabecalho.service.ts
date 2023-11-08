import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval, mergeMap, retry, startWith, take } from 'rxjs';
import { Notificacao } from 'src/app/shared/models/notificacao/notificacao.model';
import { UsuarioSs } from 'src/app/shared/models/usuario-ss/usuario-ss.model';
import { SessionStorageService } from 'src/app/shared/services/session-storage/session-storage.service';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CabecalhoService {
  constructor(
    private httpService: HttpClient,
    private ssService: SessionStorageService
  ) {}

  private createHeaders(): HttpHeaders {
    const ssDados: UsuarioSs = this.ssService.get(env.ss_token);

    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: ssDados?.token!,
    });
  }

  buscarNotificacoesWithInterval(): Observable<Notificacao[]> {
    return interval(2 * 60 * 1000).pipe(
      startWith(0),
      mergeMap(() =>
        this.httpService.get<Notificacao[]>(`${env.baseUrl}notificacoes`, {
          headers: this.createHeaders(),
        })
      )
    );
  }

  buscarNotificacoes(): Observable<Notificacao[]> {
    return this.httpService.get<Notificacao[]>(`${env.baseUrl}notificacoes`, {
      headers: this.createHeaders(),
    });
  }

  lerNotificacoes() {
    return this.httpService.put(
      `${env.baseUrl}notificacoes/marcar-como-lida`,
      null,
      {
        headers: this.createHeaders(),
      }
    );
  }
}
