export interface ListFilterProvider<E> {

  readonly key: string;

  readonly defaultFilterEntity: OrderFilter<E> | GroupFilter<E> | SortFilter<E>;

  readonly defaultFilterEntityValue: string;

  readonly values: OrderFilter<E>[] | GroupFilter<E>[] | SortFilter<E>[];

  filterByName(name: string): OrderFilter<E> | GroupFilter<E> | SortFilter<E>;

  addFilter(name: string, filter: OrderFilter<E> | GroupFilter<E> | SortFilter<E>): void;
}

export interface BaseFilter {
  readonly name: string;
  readonly value: string;
  readonly icon: string | any;
}

export interface OrderFilter<E> extends BaseFilter {
  order(entities: E[]): void;
}

export interface GroupFilter<E> extends BaseFilter {
  mapFunction: (entity: E) => any;
  groupFunction: (entity: E, group: any) => boolean;
  noGroupMatcher: (entity: E, group: any) => boolean;
  nameTransformFunction: (group: any) => string;
}

export interface SortFilter<E> extends BaseFilter {
  readonly icon: { ascending: string, descending: string };
  sort(entities: E[]): void;
}

export interface ListFilterParameters {
  groupBy?: string;
  sortBy?: string;
  orderBy?: string;
}

export type EntityGroup<T> = { group: string, entities: T[] }[];
