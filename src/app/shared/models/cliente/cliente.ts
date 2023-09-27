export class Cliente {
  constructor(
    public id?: number,
    public nome?: string,
    public email?: string,
    public cpf?: string,
    public alunoUFPR?: boolean,
    public grr?: string | null,
    public senha?: string
  ) {}
}
