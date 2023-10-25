import { StatusLocacao } from '../../enums/status-locacao/status-locacao';

export class ReservaFeitaResponse {
  constructor(
    public id?: number,
    public motivoSolicitacao?: string,
    public qtdParticipantes?: number,
    public dataHoraSolicitacao?: Date | string,
    public dataHoraInicioReserva?: Date | string,
    public dataHoraFimReserva?: Date | string,
    public status?: StatusLocacao,
    public idEspacoEsportivo?: number,
    public idAdministrador?: number,
    public idCliente?: number,
    public motivoCancelamento?: string
  ) {}
}
