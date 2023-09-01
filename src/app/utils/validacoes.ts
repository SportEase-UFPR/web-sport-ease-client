export class Validacoes {
  static isValidCpf(strCpf: string): boolean {
    const regex = new RegExp('[0-9]{11}');

    if (
      strCpf == '00000000000' ||
      strCpf == '11111111111' ||
      strCpf == '22222222222' ||
      strCpf == '33333333333' ||
      strCpf == '44444444444' ||
      strCpf == '55555555555' ||
      strCpf == '66666666666' ||
      strCpf == '77777777777' ||
      strCpf == '88888888888' ||
      strCpf == '99999999999' ||
      !regex.test(strCpf)
    )
      return false;

    let Soma = 0;
    let Resto;

    for (let i = 1; i <= 9; i++)
      Soma = Soma + parseInt(strCpf.substring(i - 1, i)) * (11 - i);

    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;

    if (Resto != parseInt(strCpf.substring(9, 10))) return false;

    Soma = 0;

    for (let i = 1; i <= 10; i++)
      Soma = Soma + parseInt(strCpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCpf.substring(10, 11))) return false;

    return true;
  }
}
