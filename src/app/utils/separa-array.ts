export class SeparaArray {
  static separarArray<T>(par: boolean, array: T[]): T[] {
    const arrayPar: T[] = [];
    const arrayImpar: T[] = [];

    array.forEach((item, i) => {
      i % 2 == 0 ? arrayPar.push(item) : arrayImpar.push(item);
    });

    return par ? arrayPar : arrayImpar;
  }
}
