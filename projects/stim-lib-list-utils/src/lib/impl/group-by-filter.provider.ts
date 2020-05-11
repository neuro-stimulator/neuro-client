
import { GroupFilter, ListFilterProvider } from '../list-filter';



export class GroupByFilterProvider<E> implements ListFilterProvider<E> {

  private static readonly KEY = 'groupBy';

  private readonly _registry: { [name: string]: GroupFilter<E> } = {};

  constructor() {
    this._registry['none'] = new GroupByFilterEntity('SHARE.DIALOGS.FILTER.GROUP_BY.NONE', 'none', 'fa-ban',
      () => '',
      () => true,
      () => false,
      ((group) => group));
  }

  get key(): string {
    return GroupByFilterProvider.KEY;
  }

  get defaultFilterEntity(): GroupFilter<E> {
    return this._registry[this.defaultFilterEntityValue];
  }

  get defaultFilterEntityValue(): string {
    return Object.keys(this._registry)[0];
  }

  get values(): GroupFilter<E>[] {
    return Object.values(this._registry);
  }

  filterByName(name: string): GroupFilter<E> {
    return this._registry[name];
  }

  addFilter(name: string, filter: GroupFilter<E>): void {
    this._registry[name] = filter;
  }
}

export class GroupByFilterEntity<E> implements GroupFilter<E> {

  public constructor(public readonly name: string, public readonly value: string, public readonly icon: string,
              public readonly mapFunction: (entity: E) => any,
              public readonly groupFunction: (entity: E, group: any) => boolean,
              public readonly noGroupMatcher: (entity: E, group: any) => boolean,
              public readonly nameTransformFunction: (group: any) => string) {}

}
