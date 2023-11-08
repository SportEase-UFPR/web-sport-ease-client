import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NovaReservaService } from './services/nova-reserva.service';
import { EspacoEsportivoResponse } from '../shared/models/espaco-esportivo/espaco-esportivo-response.model';
import { Item } from '../shared/components/inputs/input-select-option/model/item.model';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
const moment = require('moment');
import { ReservaHorariosRequest } from '../shared/models/reserva/reserva-horarios-request.model';
import { ReservaHorariosResponse } from '../shared/models/reserva/reserva-horarios-response.model';
import { ReservaRequest } from '../shared/models/reserva/reserva-request.model';
import { ReservaResponse } from '../shared/models/reserva/reserva-response.model';

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
    horario: new FormControl(null, [Validators.required]),
    objetivo: new FormControl(null, [Validators.required]),
  });

  espacosEsportivos: EspacoEsportivoResponse[] = [];
  horarios: string[] = [];
  nomesEE: Item[] = [];
  horariosDisponiveis: Item[] = [];

  nextSteps: boolean = false;
  showHorarios: boolean = false;
  showObjetivo: boolean = false;

  idEspacoQueryParam: number = 0;
  periodoLocacao: string = '';

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
              this.formNovaReserva
                .get('espacoEsportivo')
                ?.patchValue(this.idEspacoQueryParam);
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
    this.formNovaReserva.patchValue({
      qtdPessoas: null,
      data: null,
      horario: null,
      objetivo: null,
    });
    this.horarios = [];
    this.horariosDisponiveis = [];
    this.nextSteps = true;
    this.showHorarios = false;
    this.showObjetivo = false;
    this.ngxService.stopLoader('loader-01');
  }

  listarHorarios() {
    const form = this.formNovaReserva;
    const dataHoje = new Date();
    const dataEscolhida = new Date(form.get('data')?.value);

    dataHoje.setHours(0, 0, 0, 0);
    dataEscolhida.setHours(0, 0, 0, 0);
    dataEscolhida.setDate(dataEscolhida.getDate() + 1);

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
      this.showHorarios = false;

      form.patchValue({
        horario: null,
      });

      const dados: ReservaHorariosRequest = new ReservaHorariosRequest(
        dataEscolhida,
        Number(form.get('espacoEsportivo')?.value)
      );

      const setHoraiosDisponiveis = (h: string) => {
        const horario = moment()
          .hour(Number(h.split(':')[0]))
          .minute(Number(h.split(':')[1]));

        const value = `${horario.format('HH:mm')} - ${horario
          .set(
            'hour',
            horario.hour() + Number(this.periodoLocacao?.split(':')[0])
          )
          .set(
            'minute',
            horario.minute() + Number(this.periodoLocacao?.split(':')[1])
          )
          .format('HH:mm')}`;

        this.horariosDisponiveis.push(new Item(value, value));
      };

      this.reservaService.listarHorariosDisponiveis(dados).subscribe({
        next: (result: ReservaHorariosResponse) => {
          this.horarios = result.horariosDisponiveis!;
          this.periodoLocacao = result.periodoLocacao!;

          if (dataEscolhida.getTime() === dataHoje.getTime()) {
            this.horarios?.forEach((h) => {
              const horario = moment()
                .hour(Number(h.split(':')[0]))
                .minute(Number(h.split(':')[1]))
                .second(Number(h.split(':')[2]));

              if (horario.hour() >= new Date().getHours() + 1) {
                setHoraiosDisponiveis(horario.format('HH:mm'));
              }
            });
          } else {
            this.horarios?.forEach((h) => {
              setHoraiosDisponiveis(h);
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

  showMotivoReserva() {
    this.ngxService.startLoader('loader-01');
    this.showObjetivo = true;
    this.ngxService.stopLoader('loader-01');
  }

  solicitarReserva(): void {
    const form = this.formNovaReserva;

    if (form.valid) {
      this.ngxService.startLoader('loader-01');
      const data = form.get('data')?.value;

      const dataHoraInicio = `${data}T${form
        .get('horario')
        ?.value?.split('-')[0]
        .trim()}:00`.trim();

      const dataHoraFim = `${data}T${form
        .get('horario')
        ?.value?.split('-')[1]
        .trim()}:00`.trim();

      const novaReserva: ReservaRequest = new ReservaRequest(
        form.get('objetivo')?.value,
        Number(form.get('qtdPessoas')?.value),
        dataHoraInicio,
        dataHoraFim,
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
