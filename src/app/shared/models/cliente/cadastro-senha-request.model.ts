export class CadastroSenhaRequest {
  constructor(
    public tokenUsuario?: string,
    public novaSenha?: string
  ) {}
}
