import { ListFilterProvider, SortFilter } from '../list-filter';

export class SortByFilterProvider<E> implements ListFilterProvider<E> {

  private static readonly KEY = 'sortBy';

  private readonly _registry: { [name: string]: SortFilter<E> } = {};

  constructor() {

  }

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

  // static readonly ALPHABET = new SortByPosibilities('EXPERIMENTS.FILTER_DIALOG.SORT_BY.ALPHABET', 'ALPHABET',
  //   {ascending: 'fa-sort-alpha-up', descending: 'fa-sort-alpha-down'},
  //   (a: Experiment, b: Experiment) => a.name.localeCompare(b.name));
  // static readonly CREATION_DATE = new SortByPosibilities('EXPERIMENTS.FILTER_DIALOG.SORT_BY.CREATION_DATE', 'CREATION_DATE',
  //   {ascending: 'fa-sort-numeric-up', descending: 'fa-sort-numeric-down'},
  //   (a: Experiment, b: Experiment) => a.created - b.created);
  // static readonly TYPE = new SortByPosibilities('EXPERIMENTS.FILTER_DIALOG.SORT_BY.TYPE', 'TYPE',
  //   {ascending: 'fa-stethoscope', descending: 'fa-stethoscope'},
  //   (a: Experiment, b: Experiment) => a.type - b.type);
  // static readonly OUTPUT_TYPE = new SortByPosibilities('EXPERIMENTS.FILTER_DIALOG.SORT_BY.OUTPUT_TYPE', 'OUTPUT_TYPE',
  //   {ascending: 'fa-plug', descending: 'fa-plug'},
  //   (a: Experiment, b: Experiment) => outputTypeToRaw(a.usedOutputs) - outputTypeToRaw(b.usedOutputs));
  // static readonly OUTPUT_COUNT = new SortByPosibilities('EXPERIMENTS.FILTER_DIALOG.SORT_BY.OUTPUT_COUNT', 'OUTPUT_COUNT',
  //   {ascending: 'fa-hashtag', descending: 'fa-plug'},
  //   (a: Experiment, b: Experiment) => a.outputCount - b.outputCount);

  public constructor(public readonly name: string, public readonly value: string, public readonly icon: {ascending: string, descending: string},
                      public readonly sortFunction: (lhs: E, rhs: E) => number) {}

  sort(entities: E[]): void {
    entities.sort(this.sortFunction);
  }

}
