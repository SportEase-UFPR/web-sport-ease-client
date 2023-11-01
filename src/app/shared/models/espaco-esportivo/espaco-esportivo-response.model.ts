import { EsporteResponse } from '../esporte/esporte-response';

export class EspacoEsportivoResponse {
  constructor(
    public id?: number,
    public nome?: string,
    public descricao?: string,
    public localidade?: string,
    public piso?: string,
    public dimensoes?: string,
    public capacidade?: number,
    public disponivel?: boolean,
    public listaEsportes?: EsporteResponse[],
    public imagemBase64?: string,
    public horaAbertura?: string,
    public horaFechamento?: string,
    public periodoLocacao?: string,
    public maxLocacaoDia?: number
  ) {}
}
