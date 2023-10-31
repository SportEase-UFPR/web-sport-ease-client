import { Component, OnInit } from '@angular/core';
import { EspacosEsportivosService } from './services/espacos-esportivos.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Item } from '../shared/components/inputs/input-select-option/model/item.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EspacoEsportivoResponse } from '../shared/models/dto/espaco-esportivo-response/espaco-esportivo-response.model';

@Component({
  selector: 'app-espacos-esportivos',
  templateUrl: './espacos-esportivos.component.html',
  styleUrls: ['./espacos-esportivos.component.scss'],
})
export class EspacosEsportivosComponent implements OnInit {
  formFilter: FormGroup = new FormGroup({
    esporte: new FormControl(0, [Validators.required]),
  });

  espacos: EspacoEsportivoResponse[] = [];
  espacosFiltered: EspacoEsportivoResponse[] = [];
  esportes: Item[] = [];

  constructor(
    private eeService: EspacosEsportivosService,
    private toastrService: ToastrService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.ngxService.startLoader('loader-01');
    this.eeService.listarEE().subscribe({
      next: (result: EspacoEsportivoResponse[]) => {
        this.ngxService.stopLoader('loader-01');
        if (result.length > 0) {
          if (result.length > 1) {
            this.espacos = this.ordernaEspacosAlfabetico(result);
          } else {
            this.espacos = result;
          }

          this.eeService.listarEsportes().subscribe({
            next: (result) => {
              this.esportes = result.map((e) => new Item(e.id, e.nome));
              this.esportes.push(new Item(0, 'Todos'));
              this.esportes.sort((a, b) => Number(a.value) - Number(b.value));
            },
            error: (err) => {
              this.esportes = [];
            },
          });
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

  filterByEsporte(): void {
    this.ngxService.startLoader('loader-01');
    const esporteEscolhido = this.formFilter.get('esporte');
    this.espacosFiltered = [];

    if (esporteEscolhido?.value && esporteEscolhido?.value !== 0) {
      this.espacos.forEach((ee) => {
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

      if (this.espacosFiltered.length == 0 && esporteEscolhido?.value !== 0) {
        this.toastrService.info(
          'O esporte escolhido não se encontra em nenhum dos espaços esportivos cadastrados. Por favor, escolha outro esporte',
          'Nenhum espaço esportivo encontrado'
        );
        esporteEscolhido.patchValue(0);
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
