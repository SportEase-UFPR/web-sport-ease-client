export class ClienteAlteracaoRequest {
  constructor(
    public nome?: string,
    public email?: string,
    public senha?: string
  ) {}
}
