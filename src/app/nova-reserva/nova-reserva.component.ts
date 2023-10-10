import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NovaReservaService } from './services/nova-reserva.service';
import { EspacoEsportivoResponse } from '../shared/models/espaco-esportivo-response/espaco-esportivo-response.model';
import { Item } from '../shared/components/inputs/input-select-option/model/item.model';
import { ReservaHorariosRequest } from '../shared/models/reserva-horarios-request/reserva-horarios-request.model';
import { ReservaHorariosResponse } from '../shared/models/reserva-horarios-response/reserva-horarios-response.model';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ReservaRequest } from '../shared/models/reserva-request/reserva-request.model';
import { ReservaResponse } from '../shared/models/reserva-response/reserva-response.model';

@Component({
  selector: 'app-nova-reserva',
  templateUrl: './nova-reserva.component.html',
  styleUrls: ['./nova-reserva.component.scss'],
})
export class NovaReservaComponent implements OnInit {
  formNovaReserva: FormGroup = new FormGroup({
    espacoEsportivo: new FormControl(null, [Validators.required]),
    qtdPessoas: new FormControl(null, [Validators.required, Validators.min(1)]),
    data: new FormControl(null, [Validators.required]),
    horarioInicio: new FormControl(null, [Validators.required]),
    qtdHoras: new FormControl(null, [Validators.required]),
    objetivo: new FormControl(null, [Validators.required]),
  });

  espacosEsportivos: EspacoEsportivoResponse[] = [];
  horarios: number[] = [];
  nomesEE: Item[] = [];
  horariosDisponiveis: Item[] = [];
  qtdHoras: Item[] = [];

  nextSteps: boolean = false;
  showHorarios: boolean = false;
  showQtdHoras: boolean = false;
  showObjetivo: boolean = false;

  idEspacoQueryParam: number = 0;

  constructor(
    private reservaService: NovaReservaService,
    private toastrService: ToastrService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ngxService.startLoader('loader-01');
    this.reservaService.listarEE().subscribe({
      next: (result: EspacoEsportivoResponse[]) => {
        this.ngxService.stopLoader('loader-01');
        if (result.length > 0) {
          this.espacosEsportivos = result;
          this.espacosEsportivos.forEach((ee) => {
            this.nomesEE.push(new Item(ee.id, ee.nome));
          });

          this.activatedRoute.queryParams.subscribe((qP) => {
            if (qP['espaco']) {
              this.idEspacoQueryParam = Number(qP['espaco']);
              this.showNextSteps();
            }
          });
        } else {
          this.toastrService.info(
            'Por favor, realize a solicitação de reserva em outro momento',
            'Nenhum espaço esportivo disponível'
          );
        }
      },
      error: (err) => {
        this.ngxService.stopLoader('loader-01');
        this.toastrService.error(
          'Por favor, tente solictar uma reserva novamnete dentro de alguns instantes',
          'Erro ao buscar espaços esportivos'
        );
        console.error(err);
      },
    });
  }

  showNextSteps(): void {
    this.ngxService.startLoader('loader-01');
    this.nextSteps = true;
    this.ngxService.stopLoader('loader-01');
  }

  listarHorarios() {
    const form = this.formNovaReserva;
    const dataHoje = new Date();
    const dataEscolhida = new Date(form.get('data')?.value);

    dataHoje.setHours(0, 0, 0, 0);
    dataEscolhida.setHours(0, 0, 0, 0);
    dataEscolhida.setDate(dataEscolhida.getDate() + 1);
    console.log(dataHoje, dataEscolhida, form.get('data')?.value);

    if (dataEscolhida < dataHoje) {
      this.toastrService.warning(
        `Por favor, selecione uma data a partir de ${
          dataHoje.getDate() < 10
            ? '0' + dataHoje.getDate()
            : dataHoje.getDate()
        }/${dataHoje.getMonth() + 1}/${dataHoje.getFullYear()}`,
        'Data inválida'
      );
    } else {
      this.ngxService.startLoader('loader-01');
      this.horariosDisponiveis = [];
      this.qtdHoras = [];
      this.showHorarios = false;
      this.showQtdHoras = false;

      form.patchValue({
        horarioInicio: null,
        qtdHoras: null,
      });

      const dados: ReservaHorariosRequest = new ReservaHorariosRequest(
        dataEscolhida,
        Number(form.get('espacoEsportivo')?.value)
      );

      this.reservaService.listarHorariosDisponiveis(dados).subscribe({
        next: (result: ReservaHorariosResponse) => {
          this.horarios = result.horaInteira!;
          if (dataEscolhida.getTime() === dataHoje.getTime()) {
            this.horarios?.forEach((h) => {
              if (h >= new Date().getHours() + 1) {
                this.horariosDisponiveis.push(
                  new Item(h, `${h < 10 ? '0' + h : h}:00`)
                );
              }
            });
          } else {
            this.horarios?.forEach((h) => {
              this.horariosDisponiveis.push(
                new Item(h, `${h < 10 ? '0' + h : h}:00`)
              );
            });
          }

          this.ngxService.stopLoader('loader-01');
          if (this.horariosDisponiveis.length == 0) {
            this.toastrService.info(
              'Não temos horários disponíveis para este dia. Por favor, selecione outra data',
              'Nenhum horário livre'
            );
          } else {
            this.showHorarios = true;
          }
        },
        error: (err) => {
          this.ngxService.stopLoader('loader-01');
          this.toastrService.error(
            'Por favor, selecione outra data ou tente novamente mais tarde',
            'Erro ao buscar os horários disponíveis'
          );
          console.error(err);
        },
      });
    }
  }

  listarQtdHoras() {
    this.ngxService.startLoader('loader-01');
    this.qtdHoras = [];
    this.showQtdHoras = true;
    const horaSelecionada = Number(
      this.formNovaReserva.get('horarioInicio')?.value
    );
    this.qtdHoras.push(new Item(1, '1 hora'));
    const posicaoHorario = this.horarios.indexOf(horaSelecionada);

    if (horaSelecionada + 1 === this.horarios[posicaoHorario + 1]) {
      this.qtdHoras.push(new Item(2, '2 horas'));

      if (horaSelecionada + 2 === this.horarios[posicaoHorario + 2]) {
        this.qtdHoras.push(new Item(3, '3 horas'));
      }
    }

    this.showObjetivo = true;
    this.ngxService.stopLoader('loader-01');
  }

  solicitarReserva(): void {
    const form = this.formNovaReserva;

    if (form.valid) {
      this.ngxService.startLoader('loader-01');
      const data = form.get('data')?.value;

      const dataHoraInicio = `${data} ${Number(
        form.get('horarioInicio')?.value
      )}:00`;

      const dataHoraFim = `${data} ${
        Number(form.get('horarioInicio')?.value) +
        Number(form.get('qtdHoras')?.value)
      }:00`;

      const novaReserva: ReservaRequest = new ReservaRequest(
        form.get('objetivo')?.value,
        Number(form.get('qtdPessoas')?.value),
        new Date(dataHoraInicio),
        new Date(dataHoraFim),
        Number(form.get('espacoEsportivo')?.value)
      );

      this.reservaService.solicitarReserva(novaReserva).subscribe({
        next: (result: ReservaResponse) => {
          this.ngxService.stopLoader('loader-01');
          this.toastrService.success(
            'A sua solicitação de reserva foi registrada',
            'Sucesso'
          );
          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          this.ngxService.stopLoader('loader-01');
          this.toastrService.error(
            'Por favor, tente novamnete mais tarde',
            'Erro ao solicitar reserva'
          );
        },
      });
    } else {
      this.toastrService.warning(
        'Por favor, preencha todos os campos do formulário',
        'Formulário incompleto'
      );
    }
  }
}
