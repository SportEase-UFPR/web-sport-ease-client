import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NovaReservaService } from './services/nova-reserva.service';
import { Item } from '../shared/components/inputs/input-select-option/model/item.model';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ReservaHorariosRequest } from '../shared/models/reserva/reserva-horarios-request.model';
import { ReservaHorariosResponse } from '../shared/models/reserva/reserva-horarios-response.model';
import { ReservaRequest } from '../shared/models/reserva/reserva-request.model';
import { ReservaResponse } from '../shared/models/reserva/reserva-response.model';
import { EsporteResponse } from '../shared/models/esporte/esporte-response';
import { EspacoEsportivoReservaResponse } from '../shared/models/espaco-esportivo/espaco-esportivo-reserva-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, distinctUntilChanged, take, takeUntil } from 'rxjs';
import { ModalInfoComponent } from './modal-info/modal-info.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
const moment = require('moment');

@Component({
  selector: 'app-nova-reserva',
  templateUrl: './nova-reserva.component.html',
  styleUrls: ['./nova-reserva.component.scss'],
})
export class NovaReservaComponent implements OnInit, OnDestroy {
  formNovaReserva: FormGroup = new FormGroup({
    espacoEsportivo: new FormControl(null, [Validators.required]),
    qtdPessoas: new FormControl(null, [Validators.required, Validators.min(1)]),
    data: new FormControl(null, [Validators.required]),
    horario: new FormControl(null, [Validators.required]),
    horarioFim: new FormControl(null),
    objetivo: new FormControl(null, [Validators.required]),
  });

  espacosEsportivos: EspacoEsportivoReservaResponse[] = [];
  horarios: string[] = [];
  nomesEE: Item[] = [];
  horariosDisponiveis: Item[] = [];
  horariosDisponiveisFim: Item[] = [];
  esportes: EsporteResponse[] = [];
  qtdMinima: number = 1;
  qtdMaxima: number = 1;
  maxLocacao: number = 1;

  showQtd: boolean = false;
  showDatas: boolean = false;
  showHorarios: boolean = false;
  showObjetivo: boolean = false;
  showHorarioFinal: boolean = false;

  periodoLocacao: string = '';
  enabledDays: number[] = [];

  data$ = new Subject();
  qtdPessoas$ = new Subject();

  constructor(
    private reservaService: NovaReservaService,
    private toastrService: ToastrService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.ngxService.startLoader('loader-01');
    this.reservaService
      .listarEE()
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.ngxService.stopLoader('loader-01');
          if (result.length > 0) {
            this.espacosEsportivos = result;
            this.espacosEsportivos.forEach((ee) => {
              this.nomesEE.push(new Item(ee.id, ee.nome));
            });

            this.activatedRoute.queryParams.pipe(take(1)).subscribe((qP) => {
              if (qP['espaco']) {
                this.formNovaReserva
                  .get('espacoEsportivo')
                  ?.patchValue(Number(qP['espaco']));
                this.formNovaReserva.updateValueAndValidity();
                this.showQtdParticipantes();
              }
            });

            this.openModalInfo();
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
            'Por favor, tente solictar uma reserva novamente dentro de alguns instantes',
            'Erro ao buscar espaços esportivos'
          );
          console.error(err);
        },
      });

    this.formNovaReserva
      .get('qtdPessoas')
      ?.statusChanges.pipe(distinctUntilChanged(), takeUntil(this.qtdPessoas$))
      .subscribe((s) => this.showDatepicker(s));

    this.formNovaReserva
      .get('data')
      ?.valueChanges.pipe(takeUntil(this.data$))
      .subscribe((v) => (v ? this.listarHorarios() : null));
  }

  ngOnDestroy(): void {
    this.qtdPessoas$.next(null);
    this.data$.next(null);
    this.qtdPessoas$.complete();
    this.data$.complete();
  }

  openModalInfo(): void {
    this.modalService.open(ModalInfoComponent, {
      centered: true,
    });
  }

  showDatepicker(status: string) {
    this.ngxService.startLoader('loader-01');
    this.horarios = [];
    this.horariosDisponiveis = [];
    this.showHorarios = false;
    this.showHorarioFinal = false;
    this.showObjetivo = false;
    const form = this.formNovaReserva;
    form.get('data')?.reset();
    form.get('horario')?.reset();
    form.get('horarioFim')?.reset();
    form.get('objetivo')?.reset();
    if (status == 'VALID') {
      this.showDatas = true;
    } else {
      this.showDatas = false;
    }
    this.ngxService.stopLoader('loader-01');
  }

  showQtdParticipantes(): void {
    this.ngxService.startLoader('loader-01');
    const form = this.formNovaReserva;
    form.get('qtdPessoas')?.reset();
    form.get('data')?.reset();
    form.get('horario')?.reset();
    form.get('objetivo')?.reset();
    form.get('horarioFim')?.reset();

    this.horarios = [];
    this.horariosDisponiveis = [];
    this.esportes = [];
    this.showHorarios = false;
    this.showHorarioFinal = false;
    this.showObjetivo = false;

    const espacoEsportivo = this.espacosEsportivos.filter(
      (e) => e.id == Number(form.get('espacoEsportivo')?.value)
    )[0];
    this.esportes = espacoEsportivo.listaEsportes!;
    this.qtdMinima = espacoEsportivo.capacidadeMin!;
    this.qtdMaxima = espacoEsportivo.capacidadeMax!;
    this.enabledDays = espacoEsportivo.diasFuncionamento!;
    this.maxLocacao = espacoEsportivo.maxLocacaoDia!;

    form
      .get('qtdPessoas')
      ?.addValidators([
        Validators.max(this.qtdMaxima),
        Validators.min(this.qtdMinima),
      ]);
    form.updateValueAndValidity();

    this.showQtd = true;
    this.ngxService.stopLoader('loader-01');
  }

  listarHorarios() {
    this.ngxService.startLoader('loader-01');
    const form = this.formNovaReserva;
    const dataHoje = new Date();
    const dataEscolhida = new Date(form.get('data')?.value);

    dataHoje.setHours(0, 0, 0, 0);
    dataEscolhida.setHours(0, 0, 0, 0);

    this.showObjetivo = false;
    this.formNovaReserva.get('objetivo')?.reset();
    this.horariosDisponiveis = [];
    this.horariosDisponiveisFim = [];
    this.showHorarios = false;
    this.showHorarioFinal = false;

    form.patchValue({
      horario: null,
    });

    const dados: ReservaHorariosRequest = new ReservaHorariosRequest(
      dataEscolhida,
      Number(form.get('espacoEsportivo')?.value)
    );

    this.reservaService
      .listarHorariosDisponiveis(dados)
      .pipe(take(1))
      .subscribe({
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
                this.setHoraiosDisponiveis(horario.format('HH:mm'));
              }
            });
          } else {
            this.horarios?.forEach((h) => {
              this.setHoraiosDisponiveis(h);
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

  setHoraiosDisponiveis(h: string) {
    const horario = moment()
      .hour(Number(h.split(':')[0]))
      .minute(Number(h.split(':')[1]));

    const form = this.formNovaReserva;
    if (this.maxLocacao == 1) {
      form.get('horarioFim')?.removeValidators([Validators.required]);
      form.updateValueAndValidity();

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
    } else {
      form.get('horarioFim')?.addValidators([Validators.required]);
      form.updateValueAndValidity();
      const valueInicial = `${horario.format('HH:mm')}`;
      this.horariosDisponiveis.push(new Item(valueInicial, valueInicial));
    }
  }

  showHorarioFim() {
    this.ngxService.startLoader('loader-01');
    const form = this.formNovaReserva;
    form.patchValue({
      horarioFim: null,
    });

    this.horariosDisponiveisFim = [];
    this.showHorarioFinal = false;
    this.showObjetivo = false;

    const formHora = form.get('horario')?.value;
    const horario = moment()
      .hour(Number(formHora.split(':')[0]))
      .minute(Number(formHora.split(':')[1]));

    const posicaoInicial = this.horarios.indexOf(`${formHora}:00`);

    for (let i = 0; i < this.maxLocacao; i++) {
      this.showHorarioFinal = false;
      const valueFinal = `${horario
        .set(
          'hour',
          horario.hour() + Number(this.periodoLocacao?.split(':')[0])
        )
        .set(
          'minute',
          horario.minute() + Number(this.periodoLocacao?.split(':')[1])
        )
        .format('HH:mm')}`;

      if (i == 0) {
        this.horariosDisponiveisFim.push(new Item(valueFinal, valueFinal));
      } else {
        if (this.horarios[posicaoInicial + i + 1] == `${valueFinal}:00`) {
          this.horariosDisponiveisFim.push(new Item(valueFinal, valueFinal));
        }
      }
    }

    setTimeout(() => {
      this.showHorarioFinal = true;
      if (this.horariosDisponiveisFim.length == 1) {
        form.patchValue({
          horarioFim: this.horariosDisponiveisFim[0].value,
        });

        this.showObjetivo = true;
      }
      this.ngxService.stopLoader('loader-01');
    }, 1000);
  }

  montarHorariosFim() {}

  showMotivoReserva() {
    this.ngxService.startLoader('loader-01');
    this.showObjetivo = true;
    this.ngxService.stopLoader('loader-01');
  }

  solicitarReserva(): void {
    const form = this.formNovaReserva;

    if (form.valid) {
      this.ngxService.startLoader('loader-01');
      const data = moment(form.get('data')?.value).format('YYYY-MM-DD');
      let dataHoraInicio = '';
      let dataHoraFim = '';

      if (this.maxLocacao == 1) {
        dataHoraInicio = `${data}T${form
          .get('horario')
          ?.value?.split('-')[0]
          .trim()}:00`.trim();

        dataHoraFim = `${data}T${form
          .get('horario')
          ?.value?.split('-')[1]
          .trim()}:00`.trim();
      } else {
        dataHoraInicio = `${data}T${form.get('horario')?.value?.trim()}`;
        dataHoraFim = `${data}T${form.get('horarioFim')?.value?.trim()}`;
      }

      const novaReserva: ReservaRequest = new ReservaRequest(
        form.get('objetivo')?.value,
        Number(form.get('qtdPessoas')?.value),
        dataHoraInicio,
        dataHoraFim,
        Number(form.get('espacoEsportivo')?.value)
      );

      this.reservaService
        .solicitarReserva(novaReserva)
        .pipe(take(1))
        .subscribe({
          next: (result: ReservaResponse) => {
            this.ngxService.stopLoader('loader-01');
            this.toastrService.success(
              'Acompannhe a sua solicitção pela tela "Iníco" ou pela tela "Minhas Reservas"',
              'Reserva solicitada'
            );
            this.router.navigateByUrl('/dashboard');
          },
          error: (err: HttpErrorResponse) => {
            this.ngxService.stopLoader('loader-01');
            this.toastrService.error(
              err.error.message ?? 'Por favor, tente novamnete mais tarde',
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
