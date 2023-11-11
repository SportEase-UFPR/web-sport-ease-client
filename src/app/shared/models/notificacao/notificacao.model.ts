export class Notificacao {
  constructor(
    public id?: number,
    public idCliente?: number,
    public titulo?: string,
    public conteudo?: string,
    public lida?: boolean,
    public dataHora?: Date | string
  ) {}
}
