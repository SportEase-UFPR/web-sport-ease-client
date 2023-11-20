import { EsporteResponse } from '../esporte/esporte-response';

export class EspacoEsportivoResponse {
  constructor(
    public id?: number,
    public nome?: string,
    public descricao?: string,
    public localidade?: string,
    public piso?: string,
    public dimensoes?: string,
    public disponivel?: boolean,
    public listaEsportes?: EsporteResponse[],
    public imagemBase64?: string,
    public horaAbertura?: string,
    public horaFechamento?: string,
    public periodoLocacao?: string,
    public maxLocacaoDia?: number,
    public mediaAvaliacoes?: number,
    public capacidadeMax?: number,
    public capacidadeMin?: number,
    public diasFuncionamento?: number[],
    public contagemAvaliacoes?: number
  ) {}
}
