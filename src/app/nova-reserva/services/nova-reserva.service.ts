import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioSs } from 'src/app/shared/models/usuario-ss/usuario-ss.model';
import { SessionStorageService } from 'src/app/shared/services/session-storage/session-storage.service';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ReservaHorariosResponse } from 'src/app/shared/models/reserva/reserva-horarios-response.model';
import { ReservaHorariosRequest } from 'src/app/shared/models/reserva/reserva-horarios-request.model';
import { ReservaResponse } from 'src/app/shared/models/reserva/reserva-response.model';
import { ReservaRequest } from 'src/app/shared/models/reserva/reserva-request.model';
import { EspacoEsportivoReservaResponse as eeReservaResponse } from 'src/app/shared/models/espaco-esportivo/espaco-esportivo-reserva-response.model';
import { EspacoEsportivoResponse as eeResponse} from 'src/app/shared/models/espaco-esportivo/espaco-esportivo-response.model';

@Injectable({
  providedIn: 'root',
})
export class NovaReservaService {
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

  public listarEE(): Observable<eeReservaResponse[]> {
    return this.httpService.get<eeReservaResponse[]>(
      `${env.baseUrl}espacos-esportivos/disponiveis`,
      { headers: this.createHeaders() }
    );
  }

  public buscarEE(id: number): Observable<eeResponse> {
    return this.httpService.get<eeResponse>(
      `${env.baseUrl}espacos-esportivos/${id}`,
      { headers: this.createHeaders() }
    );
  }

  public listarHorariosDisponiveis(
    dados: ReservaHorariosRequest
  ): Observable<ReservaHorariosResponse> {
    return this.httpService.post<ReservaHorariosResponse>(
      `${env.baseUrl}locacoes/horarios-disponiveis`,
      JSON.stringify(dados),
      { headers: this.createHeaders() }
    );
  }

  public solicitarReserva(
    reserva: ReservaRequest
  ): Observable<ReservaResponse> {
    return this.httpService.post<ReservaResponse>(
      `${env.baseUrl}locacoes/solicitar-locacao`,
      JSON.stringify(reserva),
      { headers: this.createHeaders() }
    );
  }
}
