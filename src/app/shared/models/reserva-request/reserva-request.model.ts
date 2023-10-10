export class ReservaRequest {
  constructor(
    public motivoSolicitacao?: string,
    public qtdParticipantes?: number,
    public dataHoraInicioReserva?: Date,
    public dataHoraFimReserva?: Date,
    public idEspacoEsportivo?: number
  ) {}
}
