import { Experiment, ExperimentType, outputTypeToRaw } from '@stechy1/diplomka-share';

export interface FilterParameters {
  groupBy: string;
  sortBy: string;
  orderBy: string;
}

export class GroupByPosibilities {
  static readonly KEY = 'groupBy';

  static readonly NONE = new GroupByPosibilities('EXPERIMENTS.FILTER_DIALOG.GROUP_BY.NONE', 'NONE', 'fa-ban',
    () => '',
    () => true,
    () => false,
    (group => group));
  static readonly TYPE = new GroupByPosibilities('EXPERIMENTS.FILTER_DIALOG.GROUP_BY.TYPE', 'TYPE', 'fa-stethoscope',
    experiment => `${experiment.type}`,
    (experiment: Experiment, group: string) => experiment.type === +group,
    () => false,
    (group: string) => ExperimentType[+group]);
  static readonly TAG = new GroupByPosibilities('EXPERIMENTS.FILTER_DIALOG.GROUP_BY.TAG', 'TAG', 'fa-tags',
    experiment => experiment.tags,
    (experiment: Experiment, group: string) => experiment.tags.includes(group),
    (experiment: Experiment, group: string) => experiment.tags.length === 0,
    group => group);

  static readonly VALUES: GroupByPosibilities[] = [
    GroupByPosibilities.NONE,
    GroupByPosibilities.TYPE,
    GroupByPosibilities.TAG
  ];

  private constructor(public readonly name: string, public readonly value: string, public readonly icon: string,
                      public readonly mapFunction: (experiment: Experiment) => any,
                      public readonly groupFunction: (experiment: Experiment, group: any) => boolean,
                      public readonly noGroupMatcher: (experiment: Experiment, group: any) => boolean,
                      public readonly nameTransformFunction: (group: any) => string) {}

}

export class SortByPosibilities {
  static readonly KEY = 'sortBy';

  static readonly ALPHABET = new SortByPosibilities('EXPERIMENTS.FILTER_DIALOG.SORT_BY.ALPHABET', 'ALPHABET',
    {ascending: 'fa-sort-alpha-up', descending: 'fa-sort-alpha-down'},
    (a: Experiment, b: Experiment) => a.name.localeCompare(b.name));
  static readonly CREATION_DATE = new SortByPosibilities('EXPERIMENTS.FILTER_DIALOG.SORT_BY.CREATION_DATE', 'CREATION_DATE',
    {ascending: 'fa-sort-numeric-up', descending: 'fa-sort-numeric-down'},
    (a: Experiment, b: Experiment) => a.created - b.created);
  static readonly TYPE = new SortByPosibilities('EXPERIMENTS.FILTER_DIALOG.SORT_BY.TYPE', 'TYPE',
    {ascending: 'fa-stethoscope', descending: 'fa-stethoscope'},
    (a: Experiment, b: Experiment) => a.type - b.type);
  static readonly OUTPUT_TYPE = new SortByPosibilities('EXPERIMENTS.FILTER_DIALOG.SORT_BY.OUTPUT_TYPE', 'OUTPUT_TYPE',
    {ascending: 'fa-plug', descending: 'fa-plug'},
    (a: Experiment, b: Experiment) => outputTypeToRaw(a.usedOutputs) - outputTypeToRaw(b.usedOutputs));
  static readonly OUTPUT_COUNT = new SortByPosibilities('EXPERIMENTS.FILTER_DIALOG.SORT_BY.OUTPUT_COUNT', 'OUTPUT_COUNT',
    {ascending: 'fa-hashtag', descending: 'fa-plug'},
    (a: Experiment, b: Experiment) => a.outputCount - b.outputCount);

  static readonly VALUES: SortByPosibilities[] = [
    SortByPosibilities.ALPHABET,
    SortByPosibilities.CREATION_DATE,
    SortByPosibilities.TYPE,
    SortByPosibilities.OUTPUT_TYPE,
    SortByPosibilities.OUTPUT_COUNT
  ];

  private constructor(public readonly name: string, public readonly value: string, public readonly icon: {ascending: string, descending: string},
                      public readonly sortFunction: (lhs: Experiment, rhs: Experiment) => number) {}

}

export class OrderByPosibilities {
  static readonly KEY = 'orderBy';

  static readonly ASCENDING = new OrderByPosibilities('EXPERIMENTS.FILTER_DIALOG.ORDER_BY.ASCENDING', 'ascending', 'fa-sort-amount-up');
  static readonly DESCENDING = new OrderByPosibilities('EXPERIMENTS.FILTER_DIALOG.ORDER_BY.DESCENDING', 'descending', 'fa-sort-amount-down-alt');

  static readonly VALUES: OrderByPosibilities[] = [
    OrderByPosibilities.ASCENDING,
    OrderByPosibilities.DESCENDING
  ];

  private constructor(public readonly name: string, public readonly value: string, public readonly icon) {}

}
