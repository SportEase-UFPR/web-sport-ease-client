import { Component, OnInit } from '@angular/core';
import { EspacosEsportivosService } from './services/espacos-esportivos.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Item } from '../shared/components/inputs/input-select-option/model/item.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EspacoEsportivoResponse } from '../shared/models/espaco-esportivo/espaco-esportivo-response.model';
import { BuildFilter } from '../utils/build-filter';
import { take } from 'rxjs';

@Component({
  selector: 'app-espacos-esportivos',
  templateUrl: './espacos-esportivos.component.html',
  styleUrls: ['./espacos-esportivos.component.scss'],
})
export class EspacosEsportivosComponent implements OnInit {
  formFilter: FormGroup = new FormGroup({
    esporte: new FormControl(-1, [Validators.required]),
  });

  espacos?: EspacoEsportivoResponse[];
  espacosFiltered: EspacoEsportivoResponse[] = [];
  esportes: Item[] = [];

  constructor(
    private eeService: EspacosEsportivosService,
    private toastrService: ToastrService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.eeService.listarEE().pipe(take(1)).subscribe({
      next: (result: EspacoEsportivoResponse[]) => {
        if (result.length > 0) {
          if (result.length > 1) {
            this.espacos = this.ordernaEspacosAlfabetico(result);

            this.esportes = [];
            BuildFilter.adicionarItem(this.esportes, -1, 'Todos');
            this.espacos.forEach((ee) => {
              ee.listaEsportes?.forEach((e) => {
                BuildFilter.adicionarItem(this.esportes, e.id!, e.nome);
              });
            });
          } else {
            this.espacos = result;
          }
        } else {
          this.espacos = [];
          this.toastrService.warning(
            'Por favor, tente novamente mais tarde',
            'Nenhum espaço esportivo cadastrado'
          );
        }
      },
      error: (err) => {
        this.espacos = [];
        this.toastrService.error(
          'Por favor, tente novamente mais tarde',
          'Falha ao buscar os espaços esportivos'
        );
        console.error(err);
      },
    });
  }

  filterByEsporte(): void {
    this.ngxService.startLoader('loader-01');
    const esporteEscolhido = this.formFilter.get('esporte');
    this.espacosFiltered = [];

    if (esporteEscolhido?.value && Number(esporteEscolhido?.value) !== -1) {
      this.espacos?.forEach((ee) => {
        ee.listaEsportes?.forEach((e) => {
          if (e.id === Number(esporteEscolhido?.value)) {
            this.espacosFiltered.push(ee);
          }
        });
      });

      if (this.espacosFiltered.length > 1) {
        this.espacosFiltered = this.ordernaEspacosAlfabetico(
          this.espacosFiltered
        );
      }
    }

    this.ngxService.stopLoader('loader-01');
  }

  ordernaEspacosAlfabetico(
    array: EspacoEsportivoResponse[]
  ): EspacoEsportivoResponse[] {
    return array.sort((a, b) => {
      const nomeA = a.nome?.toUpperCase()!;
      const nomeB = b.nome?.toUpperCase()!;

      return nomeA < nomeB ? -1 : nomeA > nomeB ? 1 : 0;
    });
  }
}
