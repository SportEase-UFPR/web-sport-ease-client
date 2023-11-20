export class ReservaRequest {
  constructor(
    public motivoSolicitacao?: string,
    public qtdParticipantes?: number,
    public dataHoraInicioReserva?: Date | string,
    public dataHoraFimReserva?: Date | string,
    public idEspacoEsportivo?: number
  ) {}
}
