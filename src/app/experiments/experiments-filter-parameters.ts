import { Experiment, ExperimentType, outputTypeToRaw } from '@stechy1/diplomka-share';

export interface FilterParameters {
  groupBy: string;
  sortBy: string;
  orderBy: string;
}

export class GroupByPosibilities {
  static readonly KEY = 'groupBy';

  static readonly NONE = new GroupByPosibilities('Neseskupovat', 'NONE', 'fa-ban',
    () => '',
    () => true,
    () => false,
    (group => group));
  static readonly TYPE = new GroupByPosibilities('Typ experimentu', 'TYPE', 'fa-stethoscope',
    experiment => `${experiment.type}`,
    (experiment: Experiment, group: string) => experiment.type === +group,
    () => false,
    (group: string) => ExperimentType[+group]);
  static readonly TAG = new GroupByPosibilities('Tagu', 'TAG', 'fa-tags',
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

  static readonly ALPHABET = new SortByPosibilities('Abecedně', 'ALPHABET', {ascending: 'fa-sort-alpha-up', descending: 'fa-sort-alpha-down'},
    (a: Experiment, b: Experiment) => a.name.localeCompare(b.name));
  static readonly CREATION_DATE = new SortByPosibilities('Datum vytvoření', 'CREATION_DATE', {ascending: 'fa-sort-numeric-up', descending: 'fa-sort-numeric-down'},
    (a: Experiment, b: Experiment) => a.created - b.created);
  static readonly TYPE = new SortByPosibilities('Typ experimentu', 'TYPE', {ascending: 'fa-stethoscope', descending: 'fa-stethoscope'},
    (a: Experiment, b: Experiment) => a.type - b.type);
  static readonly OUTPUT_TYPE = new SortByPosibilities('Typ výstupu', 'OUTPUT_TYPE', {ascending: 'fa-plug', descending: 'fa-plug'},
    (a: Experiment, b: Experiment) => outputTypeToRaw(a.usedOutputs) - outputTypeToRaw(b.usedOutputs));
  static readonly OUTPUT_COUNT = new SortByPosibilities('Počtu výstupu', 'OUTPUT_COUNT', {ascending: 'fa-hashtag', descending: 'fa-plug'},
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

  static readonly ASCENDING = new OrderByPosibilities('Vzestupně', 'ascending', 'fa-sort-amount-up');
  static readonly DESCENDING = new OrderByPosibilities('Sestupně', 'descending', 'fa-sort-amount-down-alt');

  static readonly VALUES: OrderByPosibilities[] = [
    OrderByPosibilities.ASCENDING,
    OrderByPosibilities.DESCENDING
  ];

  private constructor(public readonly name: string, public readonly value: string, public readonly icon) {}

}
