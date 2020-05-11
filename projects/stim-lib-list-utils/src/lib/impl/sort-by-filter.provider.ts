import { ListFilterProvider, SortFilter } from '../list-filter';

export class SortByFilterProvider<E> implements ListFilterProvider<E> {

  private static readonly KEY = 'sortBy';

  private readonly _registry: { [name: string]: SortFilter<E> } = {};

  get key(): string {
    return SortByFilterProvider.KEY;
  }

  get defaultFilterEntity(): SortFilter<E> {
    return this._registry[this.defaultFilterEntityValue];
  }

  get defaultFilterEntityValue(): string {
    return Object.keys(this._registry)[0];
  }

  get values(): SortFilter<E>[] {
    return Object.values(this._registry);
  }

  filterByName(name: string): SortFilter<E> {
    return this._registry[name];
  }

  addFilter(name: string, filter: SortFilter<E>): void {
    this._registry[name] = filter;
  }
}

export class SortByFilterEntity<E> implements SortFilter<E> {

  public constructor(public readonly name: string, public readonly value: string, public readonly icon: {ascending: string, descending: string},
                      public readonly sortFunction: (lhs: E, rhs: E) => number) {}

  sort(entities: E[]): void {
    entities.sort(this.sortFunction);
  }

}
