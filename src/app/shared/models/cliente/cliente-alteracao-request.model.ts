export class ClienteAlteracaoRequest {
  constructor(
    public nome?: string,
    public email?: string,
    public senha?: string | null,
    public alunoUFPR?: boolean,
    public grr?: string | null
  ) {}
}
