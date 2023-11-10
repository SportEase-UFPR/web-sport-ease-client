import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EspacoEsportivoResponse } from 'src/app/shared/models/espaco-esportivo/espaco-esportivo-response.model';
import { ReservaAvaliacao } from 'src/app/shared/models/reserva/reserva-avaliacao.model';
import { ReservaFeitaResponse } from 'src/app/shared/models/reserva/reserva-feita-response';
import { UsuarioSs } from 'src/app/shared/models/usuario-ss/usuario-ss.model';
import { SessionStorageService } from 'src/app/shared/services/session-storage/session-storage.service';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MinhasReservasService {
  constructor(
    private httpService: HttpClient,
    private ssService: SessionStorageService
  ) {}

  private createHeaders(): HttpHeaders {
    const ssDados: UsuarioSs = this.ssService.get(env.ss_token);

    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: ssDados.token!,
    });
  }

  public listarReservas(): Observable<ReservaFeitaResponse[]> {
    return this.httpService.get<ReservaFeitaResponse[]>(
      `${env.baseUrl}locacoes/listar-historico-reservas`,
      { headers: this.createHeaders() }
    );
  }

  public buscarTodosEE(): Observable<EspacoEsportivoResponse[]> {
    return this.httpService.get<EspacoEsportivoResponse[]>(
      `${env.baseUrl}espacos-esportivos`,
      { headers: this.createHeaders() }
    );
  }

  public cancelarReserva(idReserva: number) {
    return this.httpService.put(
      `${env.baseUrl}locacoes/cancelar-reserva/${idReserva}`,
      null,
      { headers: this.createHeaders() }
    );
  }

  public confirmarUsoReserva(idReserva: number) {
    return this.httpService.put(
      `${env.baseUrl}locacoes/confirmar-uso/${idReserva}`,
      null,
      { headers: this.createHeaders() }
    );
  }

  public avaliarResrva(idReserva: number, dados: ReservaAvaliacao) {
    return this.httpService.post(
      `${env.baseUrl}locacoes/avaliar-reserva/${idReserva}`,
      JSON.stringify(dados),
      { headers: this.createHeaders() }
    );
  }
}
