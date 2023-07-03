import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/shared/models/cliente/cliente';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  header = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private httpService: HttpClient) {}

  cadastrar(c: Cliente): Observable<Cliente> {
    return this.httpService.post<Cliente>(`${env.baseUrl}clientes`, JSON.stringify(c), {
      headers: this.header,
    });
  }
}
