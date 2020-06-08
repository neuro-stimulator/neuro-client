import { ModuleWithProviders, NgModule } from '@angular/core';

import { ListGroupSortFilterService } from './list-group-sort-filter.service';
import { ListUtilsModuleConfig } from './list-utils-module-config';
import {
  LIST_UTILS_MODULE_FUSE_KEYS,
  LIST_UTILS_MODULE_GROUP_BY_TOKEN,
  LIST_UTILS_MODULE_ORDER_BY_TOKEN,
  LIST_UTILS_MODULE_SORT_BY_TOKEN,
  LIST_UTILS_MODULE_STORAGE_PREFIX
} from './injection-tokens';
import { ListFilterProvider } from './list-filter';
import { GroupByFilterProvider } from './impl/group-by-filter.provider';
import { SortByFilterProvider } from './impl/sort-by-filter.provider';
import { OrderByFilterProvider } from './impl/order-by-filter.provider';
@NgModule({})
export class ListUtilsModule {

  static forChild<T>(config: ListUtilsModuleConfig<T>): ModuleWithProviders {
    return {
      ngModule: ListUtilsModule,
      providers: [
        ListGroupSortFilterService,
        {
          provide: LIST_UTILS_MODULE_STORAGE_PREFIX,
          useValue: config.storageSuffix
        },
        {
          provide: LIST_UTILS_MODULE_FUSE_KEYS,
          useValue: config.fuseKeys
        },
        {
          provide: LIST_UTILS_MODULE_GROUP_BY_TOKEN,
          useFactory: (): ListFilterProvider<T> => {
            const filterProvider = new GroupByFilterProvider<T>();
            if (config.groupBy !== undefined) {
              for (const element of config.groupBy) {
                filterProvider.addFilter(element.value, element);
              }
            }
            return filterProvider;
          }
        },
        {
          provide: LIST_UTILS_MODULE_SORT_BY_TOKEN,
          useFactory: (): ListFilterProvider<T> => {
            const filterProvider = new SortByFilterProvider<T>();
            if (config.sortBy !== undefined) {
              for (const element of config.sortBy) {
                filterProvider.addFilter(element.value, element);
              }
            }
            return filterProvider;
          }
        },
        {
          provide: LIST_UTILS_MODULE_ORDER_BY_TOKEN,
          useFactory: (): ListFilterProvider<T> => {
            const filterProvider = new OrderByFilterProvider<T>();
            if (config.orderBy !== undefined) {
              for (const element of config.orderBy) {
                filterProvider.addFilter(element.value, element);
              }
            }
            return filterProvider;
          }
        }
      ]
    };
  }

}
