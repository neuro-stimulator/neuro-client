import { Experiment, ExperimentType} from '@stechy1/diplomka-share';

export interface FilterParameters {
  groupBy: string;
  sortBy: string;
  orderBy: string;
}

export class GroupByPosibilities {
  static readonly KEY = 'groupBy';

  static readonly NONE = new GroupByPosibilities('Neseskupovat', 'none', 'fa-ban',
    () => '',
    () => true,
    (group => group));
  static readonly TYPE = new GroupByPosibilities('Typ experimentu', 'type', 'fa-stethoscope',
    experiment => `${experiment.type}`,
    (experiment: Experiment, group: string) => experiment.type === +group,
    (group: string) => ExperimentType[+group]);
  // static readonly OUTPUT_TYPE = new GroupByPosibilities('Typ výstupu', 'output_type', '',
  //   experiment => `${experiment.usedOutputs}`,
  //   (experiment: Experiment, group: OutputType) => (outputTypeToRaw(experiment.usedOutputs) | outputTypeToRaw(group)) !== 0,
  //   (group: OutputType) => `${outputTypeToRaw(group)}`);

  static readonly VALUES: GroupByPosibilities[] = [
    GroupByPosibilities.NONE,
    GroupByPosibilities.TYPE,
    // GroupByPosibilities.OUTPUT_TYPE
  ];

  private constructor(public readonly name: string, public readonly value: string, public readonly icon: string,
                      public readonly mapFunction: (experiment: Experiment) => any,
                      public readonly groupFunction: (experiment: Experiment, group: any) => boolean,
                      public readonly nameTransformFunction: (group: any) => string) {}

  public static byValue(value: string): GroupByPosibilities {
    switch (value) {
      case 'none':
        return this.NONE;
      case 'type':
        return this.TYPE;
      // case 'output_type':
      //   return this.OUTPUT_TYPE;
    }
  }
}

export class SortByPosibilities {
  static readonly KEY = 'sortBy';

  static readonly ALPHABET = new SortByPosibilities('Abecedně', 'alphabeticaly', {ascending: 'fa-sort-alpha-up', descending: 'fa-sort-alpha-down'});
  static readonly CREATION_DATE = new SortByPosibilities('Datum vytvoření', 'date_of_creation', {ascending: 'fa-sort-numeric-up', descending: 'fa-sort-numeric-down'});
  static readonly TYPE = new SortByPosibilities('Typ experimentu', 'type', {ascending: 'fa-stethoscope', descending: 'fa-stethoscope'});
  static readonly OUTPUT_TYPE = new SortByPosibilities('Typ výstupu', 'output_type', {ascending: 'fa-plug', descending: 'fa-plug'});
  static readonly OUTPUT_COUNT = new SortByPosibilities('Počtu výstupu', 'output_count', {ascending: 'fa-plug', descending: 'fa-plug'});

  static readonly VALUES: SortByPosibilities[] = [
    SortByPosibilities.ALPHABET,
    SortByPosibilities.CREATION_DATE,
    SortByPosibilities.TYPE,
    SortByPosibilities.OUTPUT_TYPE,
    SortByPosibilities.OUTPUT_COUNT
  ];

  private constructor(public readonly name: string, public readonly value: string, public readonly icon: {ascending: string, descending: string}) {}

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
