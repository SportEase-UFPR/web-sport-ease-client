import { Component, OnInit } from '@angular/core';
import { EspacosEsportivosService } from './services/espacos-esportivos.service';
import { EspacoEsportivoReservaResponse } from '../shared/models/espaco-esportivo-reserva-response/espaco-esportivo-reserva-response.model';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-espacos-esportivos',
  templateUrl: './espacos-esportivos.component.html',
  styleUrls: ['./espacos-esportivos.component.scss'],
})
export class EspacosEsportivosComponent implements OnInit {
  espacos: EspacoEsportivoReservaResponse[] = [];

  constructor(
    private eeService: EspacosEsportivosService,
    private toastrService: ToastrService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.eeService.listarEE().subscribe({
      next: (result: EspacoEsportivoReservaResponse[]) => {
        this.ngxService.stopLoader('loader-01');
        if (result.length > 0) {
          this.espacos = result;
        } else {
          this.toastrService.warning(
            'Por favor, tente novamente mais tarde',
            'Nenhum espaço esportivo cadastrado'
          );
        }
      },
      error: (err) => {
        this.ngxService.stopLoader('loader-01');
        this.toastrService.error(
          'Por favor, tente novamente mais tarde',
          'Falha ao buscar os espaços esportivos'
        );
        console.error(err);
      },
    });
  }
}
