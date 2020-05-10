import { ListFilterProvider, OrderFilter } from '../list-filter';

export class OrderByFilterProvider<E> implements ListFilterProvider<E> {

  private static readonly KEY = 'orderBy';

  private readonly _registry: { [name: string]: OrderFilter<E> } = {};

  constructor() {
    this._registry['ascending'] = new OrderByFilterEntity<E>('EXPERIMENTS.FILTER_DIALOG.ORDER_BY.ASCENDING', 'ascending', 'fa-sort-amount-up',
      entities => entities.reverse());
    this._registry['descending'] = new OrderByFilterEntity<E>('EXPERIMENTS.FILTER_DIALOG.ORDER_BY.DESCENDING', 'descending', 'fa-sort-amount-down-alt',
      () => {});
  }

  get key(): string {
    return OrderByFilterProvider.KEY;
  }

  get defaultFilterEntity(): OrderFilter<E> {
    return this._registry[this.defaultFilterEntityValue];
  }

  get defaultFilterEntityValue(): string {
    return Object.keys(this._registry)[0];
  }

  get values(): OrderFilter<E>[] {
    return Object.values(this._registry);
  }

  filterByName(name: string): OrderFilter<E> {
    return this._registry[name];
  }

  addFilter(name: string, filter: OrderFilter<E>): void {
    this._registry[name] = filter;
  }
}

export class OrderByFilterEntity<E> implements OrderFilter<E> {
  public constructor(public readonly name: string,
              public readonly value: string,
              public readonly icon,
              public readonly order: (entities: E[]) => void) {}
}
