import { EsporteResponse } from '../esporte/esporte-response';

export class EspacoEsportivoReservaResponse {
  constructor(
    public id?: number,
    public nome?: string,
    public listaEsportes?: EsporteResponse[],
    public diasFuncionamento?: number[],
    public capacidadeMax?: number,
    public capacidadeMin?: number,
    public maxLocacaoDia?: number
  ) {}
}
