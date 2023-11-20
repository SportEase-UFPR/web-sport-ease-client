export class ReservaResponse {
  constructor(
    public id?: number,
    public motivoSolicitacao?: string,
    public qtdParticipantes?: number,
    public dataHoraInicioReserva?: Date,
    public dataHoraFimReserva?: Date,
    public idEspacoEsportivo?: number
  ) {}
}
