import { EventEmitter, Injectable } from '@angular/core';

import * as Fuse from 'fuse.js';

import { Experiment } from '@stechy1/diplomka-share';

import { ExperimentsService } from './experiments.service';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class ExperimentsSortFilter {

  private static readonly FUSEJS_SETTINGS = {
    tokenize: true,
    includeScore: true,
    includeMatches: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['name']
  };

  // Fusejs instance pro fulltextové vyhledávání
  private readonly _fusejs: Fuse<Experiment, Fuse.FuseOptions<Experiment>>;
  // Způsob seskupování
  private _selectedGroup: string;
  // Způsob řazení
  private _orderBy$: EventEmitter<string> = new EventEmitter<string>();
  // Kolekce experimentů pro FuseJS
  private _fuseExperiments: Experiment[] = [];
  // Výsledná kolekce, která obsahuje výsledky experimentů po filtraci
  private _resultExperiments: Experiment[] = [];
  // Poslední slovo, podle kterého se vyhledávalo
  private _lastSearch = '';

  constructor(private readonly service: ExperimentsService,
              private readonly logger: NGXLogger) {
    this._selectedGroup = 'none';
    this._fusejs = new Fuse(this._fuseExperiments, ExperimentsSortFilter.FUSEJS_SETTINGS);
    this.service.records.subscribe(value => {
      // Provedu mělkou kopii pole
      this._fuseExperiments.splice(0);
      this._fuseExperiments.push(...value);
      this.filterBy(this._lastSearch);
    });
  }

  /**
   * Metoda se zavolá vždy, když se změní způsob řazení dotazů
   *
   * @param orderBy Způsob, podle čeho se bude řadit
   * @param orderType Směr řazení (vzestupně/sestupně)
   */
  public sort(orderBy: string, orderType: string) {
    this._resultExperiments.sort((a, b) => a.name.localeCompare(b.name));
    switch (orderBy) {
      case 'date_of_creation':
        this._resultExperiments.sort((a, b) => a.created - b.created);
        break;
    }
    if (orderType === 'descending') {
      this._resultExperiments.reverse();
    }
    this._orderBy$.next(orderBy);
  }

  /**
   * Vyfiltruje experimenty podle zadané hodnoty
   *
   * @param searchedValue Fulltextová hodnota
   */
  public filterBy(searchedValue: string) {
    this.logger.debug(`Filtruji data podle: ${searchedValue}.`);
    this._lastSearch = searchedValue;
    if (searchedValue === '') {
      // Ve vyhledávání je prázdná hodnota, nebudu nic filtrovat a zobrazím všechny záznamy
      this._resultExperiments.splice(0);
      this._resultExperiments.push(...this._fuseExperiments);
      return;
    }
    // Hodnota není prázdná, jdu najít všechny odpovídající dotazy
    // @ts-ignore
    const fuseResult = this._fusejs.search(searchedValue) as Fuse.FuseResult<Experiment>[];
    // Vymažu všechny záznamy v pracovní kolekci
    this._resultExperiments.splice(0);
    // Přidám všechny nalezené záznamy do pracovní kolekce
    for (const result of fuseResult) {
      if (result.score < 0.4) {
        this._resultExperiments.push(result.item);
      }
    }
  }

  public get records(): Experiment[] {
    return this._resultExperiments;
  }
}

export class GroupByPosibilities {
  static readonly KEY = 'groupBy';

  static readonly NONE = new GroupByPosibilities('Neseskupovat', 'none');
  static readonly ENDPOINT = new GroupByPosibilities('Typ experimentu', 'type');

  static readonly VALUES: GroupByPosibilities[] = [
    GroupByPosibilities.NONE,
    GroupByPosibilities.ENDPOINT,
  ];

  private constructor(private _name: string, private _value: string) {}

  get name(): string {
    return this._name;
  }

  get value(): string {
    return this._value;
  }
}

export class OrderByPosibilities {
  static readonly KEY = 'orderBy';

  static readonly ALPHABET = new OrderByPosibilities('Abecedně', 'alphabeticaly');
  static readonly CREATION_DATE = new OrderByPosibilities('Datum vytvoření', 'date_of_creation');

  static readonly VALUES: OrderByPosibilities[] = [
    OrderByPosibilities.ALPHABET,
    OrderByPosibilities.CREATION_DATE,
  ];

  private constructor(private _name: string, private _value: string) {}

  get name(): string {
    return this._name;
  }

  get value(): string {
    return this._value;
  }

  static byValue(value: string): OrderByPosibilities {
    switch (value) {
      case 'alphabeticaly':
        return OrderByPosibilities.ALPHABET;
      case 'date_of_creation':
        return OrderByPosibilities.CREATION_DATE;
    }
  }
}

export class OrderTypePosibilities {
  static readonly KEY = 'orderType';

  static readonly ASCENDING = new OrderTypePosibilities('Vzestupně', 'ascending');
  static readonly DESCENDING = new OrderTypePosibilities('Sestupně', 'descending');

  static readonly VALUES: OrderTypePosibilities[] = [
    OrderTypePosibilities.ASCENDING,
    OrderTypePosibilities.DESCENDING
  ];

  private constructor(private _name: string, private _value: string) {}

  get name(): string {
    return this._name;
  }

  get value(): string {
    return this._value;
  }
}
