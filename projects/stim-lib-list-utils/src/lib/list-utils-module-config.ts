import { GroupFilter, OrderFilter, SortFilter } from './list-filter';

export interface ListUtilsModuleConfig<E> {

  storageSuffix: string;
  fuseKeys: string[];

  groupBy?: GroupFilter<E>[];
  sortBy?: SortFilter<E>[];
  orderBy?: OrderFilter<E>[];

}
