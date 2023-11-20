export class ReservaHorariosResponse {
  constructor(
    public horariosDisponiveis?: string[],
    public periodoLocacao?: string
  ) {}
}
