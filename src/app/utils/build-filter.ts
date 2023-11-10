import { Item } from '../shared/components/inputs/input-select-option/model/item.model';

export class BuildFilter {
  static adicionarItem(
    filtroArray: Item[],
    value: string | number,
    label?: string
  ) {
    if (
      filtroArray.length === 0 ||
      !filtroArray.some((f) => f.value === value)
    ) {
      if (label) {
        filtroArray.push(new Item(value, label));
      } else {
        filtroArray.push(new Item(value, value.toString()));
      }

      filtroArray.sort((a, b) => {
        if (
          a.value?.toString().toUpperCase()! >
          b.value?.toString().toUpperCase()!
        ) {
          return 1;
        }
        if (
          a.value?.toString().toUpperCase()! <
          b.value?.toString().toUpperCase()!
        ) {
          return -1;
        }

        return 0;
      });
    }
  }
}
