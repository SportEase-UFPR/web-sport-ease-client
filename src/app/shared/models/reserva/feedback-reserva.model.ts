export class FeedbackReserva {
  constructor(
    public idEspacoEsportivo?: number,
    public idCliente?: number,
    public nomeCliente?: string,
    public dataHoraComentario?: Date | string,
    public comentario?: string,
    public avaliacao?: number
  ) {}
}
