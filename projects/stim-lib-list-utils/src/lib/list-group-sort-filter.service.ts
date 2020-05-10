import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { LocalStorageService } from 'angular-2-local-storage';
import Fuse from 'fuse.js';

import { EntityGroup, GroupFilter, ListFilterParameters, OrderFilter, SortFilter } from './list-filter';
import { OrderByFilterProvider } from './impl/order-by-filter.provider';
import { GroupByFilterProvider } from './impl/group-by-filter.provider';
import { SortByFilterProvider } from './impl/sort-by-filter.provider';
import {
  LIST_UTILS_MODULE_FUSE_KEYS,
  LIST_UTILS_MODULE_GROUP_BY_TOKEN,
  LIST_UTILS_MODULE_ORDER_BY_TOKEN,
  LIST_UTILS_MODULE_SORT_BY_TOKEN,
  LIST_UTILS_MODULE_STORAGE_PREFIX
} from './injection-tokens';

@Injectable()
export class ListGroupSortFilterService<T> {

  // Konfigurace knihovny pro vyhledávání textů v objektech
  private static readonly FUSEJS_SETTINGS = {
    tokenize: true,
    includeScore: true,
    includeMatches: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1
  };
  // Klíč pod kterým se ukládá nastavení filtrů v local-storage aplikace
  private static readonly STORAGE_KEY_FILTER_PARAMETERS = 'filter-parameters';

  // Fusejs instance pro fulltextové vyhledávání
  private readonly _fusejs: Fuse<T, Fuse.IFuseOptions<T>>;
  // Kolekce experimentů pro FuseJS
  private _fuseExperiments: T[] = [];
  // Kolekce vyfiltrovaných experimentů
  private _filteredExperiments: T[] = [];
  // Výsledná kolekce, která obsahuje výsledky experimentů po filtraci
  private _groupExperiments: EntityGroup<T> = [];
  // Poslední slovo, podle kterého se vyhledávalo
  private _lastSearch = '';
  // Poslední použité filtrační parametry
  private _lastListFilterParameters: ListFilterParameters;
  // Emitter změn nastavení filtračních parametrů
  private _filterParametersChange: EventEmitter<ListFilterParameters> = new EventEmitter<ListFilterParameters>();
  // Pozorovatelný objekt změn nastavení filtračních parametrů
  public readonly filterParametersChange$: Observable<ListFilterParameters> = this._filterParametersChange.asObservable();

  constructor(@Inject(LIST_UTILS_MODULE_GROUP_BY_TOKEN) private readonly _groupFilterProvider: GroupByFilterProvider<T>,
              @Inject(LIST_UTILS_MODULE_SORT_BY_TOKEN) private readonly _sortFilterProvider: SortByFilterProvider<T>,
              @Inject(LIST_UTILS_MODULE_ORDER_BY_TOKEN) private readonly _orderFilterProvider: OrderByFilterProvider<T>,
              @Inject(LIST_UTILS_MODULE_STORAGE_PREFIX) private readonly _storageSuffix: string,
              @Inject(LIST_UTILS_MODULE_FUSE_KEYS) readonly fuseKeys: string[],
              private readonly logger: NGXLogger,
              private readonly _storage: LocalStorageService) {
    // Vytvořím novou instanci
    this._fusejs = new Fuse(this._fuseExperiments, {...ListGroupSortFilterService.FUSEJS_SETTINGS, keys: fuseKeys });
    // Načtu filtační parametry z local-storage
    this._loadListFilterParameters();
  }

  /**
   * Načte filtrační parametry z local-storage.
   * Pokud se v local-storage nic nenachází, použije se výchozí nastavení
   */
  private _loadListFilterParameters() {
    this._lastListFilterParameters = this._storage.get<ListFilterParameters>(this._localStorageKey)
      || this.defaultFilterParameters;
    this._filterParametersChange.next(this._lastListFilterParameters);
  }

  private get _localStorageKey(): string {
    return `${ListGroupSortFilterService.STORAGE_KEY_FILTER_PARAMETERS}-${this._storageSuffix}`;
  }

  /**
   * Vyfiltruje experimenty podle zadané hodnoty
   *
   * @param searchedValue Fulltextová hodnota
   */
  public filterBy(searchedValue: string) {
    this.logger.debug(`Filtruji data podle: '${searchedValue}'.`);
    // Uložím poslední hledané slovo
    this._lastSearch = searchedValue;
    // Pokud je to slovo prázdné
    if (searchedValue === '') {
      // Ve vyhledávání je prázdná hodnota, nebudu nic filtrovat a zobrazím všechny záznamy
      this._filteredExperiments.splice(0);
      this._filteredExperiments.push(...this._fuseExperiments);
      // Nechám experimenty seskupit
      this.groupBy();
      return;
    }
    // Hodnota není prázdná, jdu najít všechny odpovídající dotazy
    // @ts-ignore
    const fuseResult = this._fusejs.search(searchedValue) as Fuse.FuseResult<T>[];
    // Vymažu všechny záznamy v pracovní kolekci
    this._filteredExperiments.splice(0);
    // Přidám všechny nalezené záznamy do pracovní kolekce
    for (const result of fuseResult) {
      // Toto je optimální score, které indikuje shodu s hledaným podřetězcem
      if (result.score < 0.4) {
        this._filteredExperiments.push(result.item);
      }
    }
    this.groupBy();
  }

  /**
   * Seskupovací funkce, která se postará o vytvoření skupin experimentů na základě filtračních parametrů
   *
   * @param filterParameters Filtrační parametry
   */
  public groupBy(filterParameters?: ListFilterParameters): void {
    // Pokud nejsou parametry uvedeny, vezmu poslední použité
    filterParameters = filterParameters || this._lastListFilterParameters;
    // Vyprázdním pole s výsledky seskupení
    this._groupExperiments.splice(0);
    // Pokud nechci seskupovat podle ničeho
    if (filterParameters.groupBy === 'none') {
      // Založím jednu virtuální skupinu, do které vložím všechny vyfiltrované experimenty
      this._groupExperiments.push({ group: '', entities: [...this._filteredExperiments] });
      // A nechám je seřadit
      this.sort();
      // Víc už dělat nebudu
      return;
    }

    // Získám instanci třídy pro seskupování
    // const groupConfiguration: GroupByPosibilities = GroupByPosibilities[filterParameters.groupBy];
    const groupFilter: GroupFilter<T> = this._groupFilterProvider.filterByName(filterParameters.groupBy);
    // Přemapuji pole s vyfiltrovanými experimenty na jednotlivé skupiny
    let groupsWithDuplications: any = this._filteredExperiments.map(groupFilter.mapFunction);
    // Může se stát, že jednotlivé skupiny budou obsahovat ještě podskupiny
    // [ ['aaa', 'bbb'], ['aaa', ['ccc'] ] ]
    // Proto musím použít funkci 'flatMap' která mi výše uvedenou strukturu převede na jednoduché pole
    // [ 'aaa', 'bbb', 'aaa', 'ccc' ]
    groupsWithDuplications = groupsWithDuplications.flatMap( (x, _) => x);
    // Nakonec se zbavím duplicitních skupin a tím získám pole všech unikátních skupin, podle kterých budu experimenty shlukovat
    const groups: any[] = groupsWithDuplications.filter(((value, index, array) => array.indexOf(value) === index));

    // Pokud se stane, že žádné skupiny nejsou
    if (groups.length === 0) {
      // Tak opět založím virtuální skupinu, do které vložím všechny vyfiltrované experimenty
      this._groupExperiments.push({ group: '', entities: [...this._filteredExperiments] });
      // Nechám je seřadit
      this.sort();
      // A víc už dělat nebudu
      return;
    }

    // Nyní jsem v situaci, kdy mám nějaké skupiny k dispozici
    // Proto projdu každou skupinu
    for (const group of groups) {
      // Vyfiltruji všechny experimenty podle zadané skupiny
      const experiments = this._filteredExperiments.filter((experiment: T) => groupFilter.groupFunction(experiment, group));
      // A vložím novou skupinu do výsledné kolekce
      this._groupExperiments.push({ group: groupFilter.nameTransformFunction(group), entities: experiments });
    }
    // Nakonec přidám ještě takovou skupinu, která nevyhovuje žádným kritériím
    this._groupExperiments.push({ group: 'Bez skupiny', entities: this._filteredExperiments.filter(groupFilter.noGroupMatcher)});
    // Nyní můžu přejít k řazení skupin
    this.sort();
  }

  /**
   * Funkce seřadí všechny skupiny experimentů
   *
   * @param filterParameters Filtrační parametry
   */
  public sort(filterParameters?: ListFilterParameters) {
    // Pokud nejsou parametry uvedeny, vezmu poslední použité
    filterParameters = filterParameters || this._lastListFilterParameters;
    this.logger.debug(`Řadím data podle: '${filterParameters.sortBy}'.`);
    // Získám instanci třídy pro řažení
    const sortFilter: SortFilter<T> = this._sortFilterProvider.filterByName(filterParameters.sortBy);
    const orderFilter: OrderFilter<T> = this._orderFilterProvider.filterByName(filterParameters.orderBy);
    // Projdu všechny skupiny experimentů
    for (const group of this._groupExperiments) {
      // A aplikuji na ně řadící funkci
      sortFilter.sort(group.entities);
      // Nakonec, pokud je potřeba, invertuji pořadí prvků
      orderFilter.order(group.entities);
    }
  }

  public resetFilterParameters() {
    this.groupBy();
  }

  public subscribeEntities(entities: Observable<T[]>): Subscription {
    // Přihlásím se k odběru změn v kolekci s experimenty z hlavní service
    return entities.subscribe((value: T[]) => {
      // Provedu mělkou kopii pole
      this._fuseExperiments.splice(0);
      this._fuseExperiments.push(...value);
      // Zavolám přepočítání úplně celého filtračního procesu
      this.filterBy(this._lastSearch);
    });
  }

  get filterParameters(): ListFilterParameters {
    return this._lastListFilterParameters;
  }

  set filterParameters(filterParameters: ListFilterParameters) {
    this._lastListFilterParameters = filterParameters;
    this._storage.set(this._localStorageKey, filterParameters);
    this._filterParametersChange.emit(filterParameters);
  }

  get searchValue(): string {
    return this._lastSearch;
  }

  get records(): EntityGroup<T> {
    return this._groupExperiments;
  }

  /**
   * Výchozí parametry filtrování, které se použijí při prvním spuštění aplikace
   */
  get defaultFilterParameters(): ListFilterParameters {
    return {
      groupBy: this._groupFilterProvider?.defaultFilterEntityValue,
      orderBy: this._orderFilterProvider?.defaultFilterEntityValue,
      sortBy: this._sortFilterProvider?.defaultFilterEntityValue
    };
  }

  get groupByFilters(): GroupFilter<T>[] {
    return this._groupFilterProvider.values;
  }

  get sortByFilters(): SortFilter<T>[] {
    return this._sortFilterProvider.values;
  }

  get orderByFilters(): OrderFilter<T>[] {
    return this._orderFilterProvider.values;
  }
}
