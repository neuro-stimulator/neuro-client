
import { GroupFilter, ListFilterProvider } from '../list-filter';



export class GroupByFilterProvider<E> implements ListFilterProvider<E> {

  private static readonly KEY = 'groupBy';

  private readonly _registry: { [name: string]: GroupFilter<E> } = {};

  constructor() {
    this._registry['NONE'] = new GroupByFilterEntity('EXPERIMENTS.FILTER_DIALOG.GROUP_BY.NONE', 'NONE', 'fa-ban',
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

  static readonly NONE = new GroupByFilterEntity('EXPERIMENTS.FILTER_DIALOG.GROUP_BY.NONE', 'NONE', 'fa-ban',
    () => '',
    () => true,
    () => false,
    ((group) => group));
  // static readonly TYPE = new GroupByFilterEntity('EXPERIMENTS.FILTER_DIALOG.GROUP_BY.TYPE', 'TYPE', 'fa-stethoscope',
  //   (experiment: Experiment) => `${experiment.type}`,
  //   (experiment: Experiment, group: string) => experiment.type === +group,
  //   () => false,
  //   (group: string) => ExperimentType[+group]);
  // static readonly TAG = new GroupByFilterEntity('EXPERIMENTS.FILTER_DIALOG.GROUP_BY.TAG', 'TAG', 'fa-tags',
  //   (experiment) => experiment.tags,
  //   (experiment: Experiment, group: string) => experiment.tags.includes(group),
  //   (experiment: Experiment, group: string) => experiment.tags.length === 0,
  //   (group) => group);

  public constructor(public readonly name: string, public readonly value: string, public readonly icon: string,
              public readonly mapFunction: (entity: E) => any,
              public readonly groupFunction: (entity: E, group: any) => boolean,
              public readonly noGroupMatcher: (entity: E, group: any) => boolean,
              public readonly nameTransformFunction: (group: any) => string) {}

}
