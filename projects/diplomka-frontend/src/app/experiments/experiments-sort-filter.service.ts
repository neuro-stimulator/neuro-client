import { EventEmitter, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import { NGXLogger } from 'ngx-logger';

import { Experiment} from '@stechy1/diplomka-share';

import { ExperimentsService } from './experiments.service';
import { FilterParameters, GroupByPosibilities, OrderByPosibilities, SortByPosibilities } from './experiments-filter-parameters';
import { ExperimentGroup } from './experiments.share';
import Fuse from 'fuse.js';

/**
 * Služba starající se o filtrování a řezení experimentů, které se následně zobrazí v hlavním přehledu experimentů.
 */
// @Injectable({
//   providedIn: 'root'
// })
export class ExperimentsSortFilter {

  // Konfigurace knihovny pro vyhledávání textů v objektech
  private static readonly FUSEJS_SETTINGS = {
    tokenize: true,
    includeScore: true,
    includeMatches: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['name', 'tags']
  };
  // Klíč pod kterým se ukládá nastavení filtrů v local-storage aplikace
  private static readonly STORAGE_KEY_FILTER_PARAMETERS = 'filter-parameters';
  // Výchozí parametry filtrování, které se použijí při prvním spuštění aplikace
  private static readonly DEFAULT_FILTER_PARAMETERS: FilterParameters = {
    groupBy: GroupByPosibilities.NONE.value,
    sortBy: SortByPosibilities.ALPHABET.value,
    orderBy: OrderByPosibilities.ASCENDING.value
  };

  // Fusejs instance pro fulltextové vyhledávání
  private readonly _fusejs: Fuse<Experiment, Fuse.IFuseOptions<Experiment>>;
  // Kolekce experimentů pro FuseJS
  private _fuseExperiments: Experiment[] = [];
  // Kolekce vyfiltrovaných experimentů
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
    // Vytvořím novou instanci
    this._fusejs = new Fuse(this._fuseExperiments, ExperimentsSortFilter.FUSEJS_SETTINGS);
    // Načtu filtační parametry z local-storage
    this._loadFilterParameters();
    // Přihlásím se k odběru změn v kolekci s experimenty z hlavní service
    this.service.records.subscribe((value: Experiment[]) => {
      // Provedu mělkou kopii pole
      this._fuseExperiments.splice(0);
      this._fuseExperiments.push(...value);
      // Zavolám přepočítání úplně celého filtračního procesu
      this.filterBy(this._lastSearch);
    });
  }

  /**
   * Načte filtrační parametry z local-storage.
   * Pokud se v local-storage nic nenachází, použije se výchozí nastavení
   */
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
    const fuseResult = this._fusejs.search(searchedValue) as Fuse.FuseResult<Experiment>[];
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
  public groupBy(filterParameters?: FilterParameters): void {
    // Pokud nejsou parametry uvedeny, vezmu poslední použité
    filterParameters = filterParameters || this._lastFilterParameters;
    // Vyprázdním pole s výsledky seskupení
    this._groupExperiments.splice(0);
    // Pokud nechci seskupovat podle ničeho
    if (filterParameters.groupBy === GroupByPosibilities.NONE.value) {
      // Založím jednu virtuální skupinu, do které vložím všechny vyfiltrované experimenty
      this._groupExperiments.push({ group: '', experiments: [...this._filteredExperiments] });
      // A nechám je seřadit
      this.sort();
      // Víc už dělat nebudu
      return;
    }

    // Získám instanci třídy pro seskupování
    const groupConfiguration: GroupByPosibilities = GroupByPosibilities[filterParameters.groupBy];
    // Přemapuji pole s vyfiltrovanými experimenty na jednotlivé skupiny
    let groupsWithDuplications: any[] = this._filteredExperiments.map(groupConfiguration.mapFunction);
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
      this._groupExperiments.push({ group: '', experiments: [...this._filteredExperiments] });
      // Nechám je seřadit
      this.sort();
      // A víc už dělat nebudu
      return;
    }

    // Nyní jsem v situaci, kdy mám nějaké skupiny k dispozici
    // Proto projdu každou skupinu
    for (const group of groups) {
      // Vyfiltruji všechny experimenty podle zadané skupiny
      const experiments = this._filteredExperiments.filter((experiment: Experiment) => groupConfiguration.groupFunction(experiment, group));
      // A vložím novou skupinu do výsledné kolekce
      this._groupExperiments.push({ group: groupConfiguration.nameTransformFunction(group), experiments });
    }
    // Nakonec přidám ještě takovou skupinu, která nevyhovuje žádným kritériím
    this._groupExperiments.push({ group: 'Bez skupiny', experiments: this._filteredExperiments.filter(groupConfiguration.noGroupMatcher)});
    // Nyní můžu přejít k řazení skupin
    this.sort();
  }

  /**
   * Funkce seřadí všechny skupiny experimentů
   *
   * @param filterParameters Filtrační parametry
   */
  public sort(filterParameters?: FilterParameters) {
    // Pokud nejsou parametry uvedeny, vezmu poslední použité
    filterParameters = filterParameters || this._lastFilterParameters;
    this.logger.debug(`Řadím data podle: '${filterParameters.sortBy}'.`);
    // Získám instanci třídy pro řažení
    const sortConfiguration: SortByPosibilities = SortByPosibilities[filterParameters.sortBy];
    // Projdu všechny skupiny experimentů
    for (const group of this._groupExperiments) {
      // A aplikuji na ně řadící funkci
      group.experiments.sort(sortConfiguration.sortFunction);
      // Nakonec, pokud je potřeba, invertuji pořadí prvků
      if (filterParameters.orderBy === OrderByPosibilities.ASCENDING.value) {
        group.experiments.reverse();
      }
    }
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
