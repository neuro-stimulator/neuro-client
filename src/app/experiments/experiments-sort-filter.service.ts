import { EventEmitter, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import { NGXLogger } from 'ngx-logger';
import * as Fuse from 'fuse.js';

import { Experiment, outputTypeToRaw } from '@stechy1/diplomka-share';

import { ExperimentsService } from './experiments.service';
import { FilterParameters, GroupByPosibilities, OrderByPosibilities, SortByPosibilities } from './experiments-filter-parameters';
import { ExperimentGroup } from './experiments.share';

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

  private static readonly STORAGE_KEY_FILTER_PARAMETERS = 'filter-parameters';
  private static readonly DEFAULT_FILTER_PARAMETERS: FilterParameters = {
    groupBy: GroupByPosibilities.NONE.value,
    sortBy: SortByPosibilities.ALPHABET.value,
    orderBy: OrderByPosibilities.ASCENDING.value
  };

  // Fusejs instance pro fulltextové vyhledávání
  private readonly _fusejs: Fuse<Experiment, Fuse.FuseOptions<Experiment>>;
  // Způsob seskupování
  private _selectedGroup: string;
  // Kolekce experimentů pro FuseJS
  private _fuseExperiments: Experiment[] = [];
  private _filteredExperiments: Experiment[] = [];
  // Výsledná kolekce, která obsahuje výsledky experimentů po filtraci
  private _groupExperiments: ExperimentGroup = [];
  // Poslední slovo, podle kterého se vyhledávalo
  private _lastSearch = '';
  // Poslední použité filtrační parametry
  private _lastFilterParameters: FilterParameters;
  // Emitter změn nastavení filtračních parametrů
  private _filterParametersChange: EventEmitter<FilterParameters> = new EventEmitter<FilterParameters>();
  // Pozorovatelný objekt změn nastavení filtračních parametrů
  public readonly filterParametersChange$: Observable<FilterParameters> = this._filterParametersChange.asObservable();

  constructor(private readonly service: ExperimentsService,
              private readonly logger: NGXLogger,
              private readonly _storage: LocalStorageService) {
    this._selectedGroup = 'none';
    this._fusejs = new Fuse(this._fuseExperiments, ExperimentsSortFilter.FUSEJS_SETTINGS);
    this._loadFilterParameters();
    this.service.records.subscribe(value => {
      // Provedu mělkou kopii pole
      this._fuseExperiments.splice(0);
      this._fuseExperiments.push(...value);
      this.filterBy(this._lastSearch);
    });
  }

  private _loadFilterParameters() {
    this._lastFilterParameters = this._storage.get<FilterParameters>(ExperimentsSortFilter.STORAGE_KEY_FILTER_PARAMETERS)
      || ExperimentsSortFilter.DEFAULT_FILTER_PARAMETERS;
    this._filterParametersChange.next(this._lastFilterParameters);
  }

  /**
   * Vyfiltruje experimenty podle zadané hodnoty
   *
   * @param searchedValue Fulltextová hodnota
   */
  public filterBy(searchedValue: string) {
    this.logger.debug(`Filtruji data podle: '${searchedValue}'.`);
    this._lastSearch = searchedValue;
    if (searchedValue === '') {
      // Ve vyhledávání je prázdná hodnota, nebudu nic filtrovat a zobrazím všechny záznamy
      this._filteredExperiments.splice(0);
      this._filteredExperiments.push(...this._fuseExperiments);
      this.groupBy();
      return;
    }
    // Hodnota není prázdná, jdu najít všechny odpovídající dotazy
    // @ts-ignore
    const fuseResult = this._fusejs.search(searchedValue) as Fuse.FuseResult<Experiment>[];
    // Vymažu všechny záznamy v pracovní kolekci
    this._filteredExperiments.splice(0);
    // Přidám všechny nalezené záznamy do pracovní kolekce
    for (const result of fuseResult) {
      if (result.score < 0.4) {
        this._filteredExperiments.push(result.item);
      }
    }
    this.groupBy();
  }

  public groupBy(filterParameters?: FilterParameters): void {
    filterParameters = filterParameters || this._lastFilterParameters;
    this._groupExperiments.splice(0);
    if (filterParameters.groupBy === GroupByPosibilities.NONE.value) {
      this._groupExperiments.push({ group: '', experiments: [...this._filteredExperiments] });
      this.sort();
      return;
    }

    const groupConfiguration: GroupByPosibilities = GroupByPosibilities[filterParameters.groupBy];
    const groupsWithDuplications: any[] = this._filteredExperiments.map(groupConfiguration.mapFunction);
    const groups: any[] = groupsWithDuplications.filter(((value, index, array) => array.indexOf(value) === index));

    this._groupExperiments.splice(0);

    for (const group of groups) {
      const experiments = this._filteredExperiments.filter((experiment: Experiment) => groupConfiguration.groupFunction(experiment, group));
      this._groupExperiments.push({ group: groupConfiguration.nameTransformFunction(group), experiments });
    }

    this.sort();
  }

  /**
   * Metoda se zavolá vždy, když se změní způsob řazení dotazů
   *
   * @param filterParameters Filtrační parametry
   */
  public sort(filterParameters?: FilterParameters) {
    filterParameters = filterParameters || this._lastFilterParameters;
    this.logger.debug(`Řadím data podle: '${filterParameters.sortBy}'.`);
    const sortConfiguration: SortByPosibilities = SortByPosibilities[filterParameters.sortBy];
    for (const group of this._groupExperiments) {
      group.experiments.sort(sortConfiguration.sortFunction);
      // group.experiments.sort((a, b) => a.name.localeCompare(b.name));
      // switch (filterParameters.sortBy) {
      //   case 'date_of_creation':
      //     group.experiments.sort((a, b) => a.created - b.created);
      //     break;
      //   case 'type':
      //     group.experiments.sort((a, b) => a.type - b.type);
      //     break;
      //   case 'output_type':
      //     group.experiments.sort((a, b) => outputTypeToRaw(a.usedOutputs) - outputTypeToRaw(b.usedOutputs));
      //     break;
      //   case 'output_count':
      //     group.experiments.sort((a, b) => a.outputCount - b.outputCount);
      //     break;
      // }
      if (filterParameters.orderBy === 'descending') {
        group.experiments.reverse();
      }
    }
    console.log(this._groupExperiments);
    // this._resultExperiments.sort((a, b) => a.name.localeCompare(b.name));
    // this.logger.debug(`Řadím data podle: '${filterParameters.sortBy}'.`);
    // switch (filterParameters.sortBy) {
    //   case 'date_of_creation':
    //     this._resultExperiments.sort((a, b) => a.created - b.created);
    //     break;
    //   case 'experiment_type':
    //     this._resultExperiments.sort((a, b) => a.type - b.type);
    //     break;
    // }
    // if (filterParameters.orderBy === 'descending') {
    //   this._resultExperiments.reverse();
    // }
  }

  public resetFilterParameters() {
    this.groupBy();
  }

  get filterParameters() {
    return this._lastFilterParameters;
  }

  set filterParameters(filterParameters: FilterParameters) {
    this._lastFilterParameters = filterParameters;
    this._storage.set(ExperimentsSortFilter.STORAGE_KEY_FILTER_PARAMETERS, filterParameters);
    this._filterParametersChange.emit(filterParameters);
  }

  get searchValue(): string {
    return this._lastSearch;
  }

  public get records(): ExperimentGroup {
    return this._groupExperiments;
  }
}


