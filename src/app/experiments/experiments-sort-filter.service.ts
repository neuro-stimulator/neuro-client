import { EventEmitter, Injectable } from '@angular/core';
import { ExperimentsService } from './experiments.service';
import { Experiment } from '@stechy1/diplomka-share';

@Injectable({
  providedIn: 'root'
})
export class ExperimentsSortFilter {

  // Způsob seskupování
  private _selectedGroup: string;
  // Způsob řazení
  private _orderBy$: EventEmitter<string> = new EventEmitter<string>();
  // Kolekce Experimentů
  private _fuseQueries: Experiment[] = [];

  constructor(private readonly service: ExperimentsService) {
    this._selectedGroup = 'none';
    this.service.records.subscribe(value => {
      // Provedu mělkou kopii pole
      this._fuseQueries = [...value];
    });
  }

  /**
   * Metoda se zavolá vždy, když se změní způsob řazení dotazů
   *
   * @param orderBy Způsob, podle čeho se bude řadit
   * @param orderType Směr řazení (vzestupně/sestupně)
   */
  public sort(orderBy: string, orderType: string) {
    this._fuseQueries.sort((a, b) => a.name.localeCompare(b.name));
    switch (orderBy) {
      case 'date_of_creation':
        this._fuseQueries.sort((a, b) => a.created - b.created);
        break;
    }
    if (orderType === 'descending') {
      this._fuseQueries.reverse();
    }
    this._orderBy$.next(orderBy);
  }

  /**
   * Vyfiltruje experimenty podle zadané hodnoty
   *
   * @param searchedValue Fulltextová hodnota
   */
  public filterBy(searchedValue: string) {
    // Hodnota není prázdná, jdu najít všechny odpovídající dotazy
    // @ts-ignore
    const fuseResult = []; // this._fusejs.search(searchedValue) as FuseResult<Experiment>[];
    console.log(fuseResult);
    // Vymažu všechny záznamy v pracovní kolekci
    this._fuseQueries.splice(0);
    // Přidám všechny nalezené záznamy do pracovní kolekce
    for (const result of fuseResult) {
      if (result.score < 0.4) {
        this._fuseQueries.push(result.item);
      }
    }
  }


  public get records(): Experiment[] {
    return this._fuseQueries;
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
