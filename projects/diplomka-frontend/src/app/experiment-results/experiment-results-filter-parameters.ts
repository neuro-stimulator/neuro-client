import { ExperimentResult, ExperimentType} from '@stechy1/diplomka-share';

import { GroupByFilterEntity, GroupFilter, SortByFilterEntity, SortFilter } from 'stim-lib-list-utils';

export const GROUP_BY_FILTERS: GroupFilter<ExperimentResult>[] = [
  new GroupByFilterEntity('EXPERIMENTS.FILTER_DIALOG.GROUP_BY.TYPE', 'TYPE', 'fa-stethoscope',
    (experimentResult: ExperimentResult) => `${experimentResult.type}`,
    (experimentResult: ExperimentResult, group: string) => experimentResult.type === +group,
    () => false,
    (group: string) => ExperimentType[+group]),
];

export const SORT_BY_FILTERS: SortFilter<ExperimentResult>[] = [
  new SortByFilterEntity('EXPERIMENTS.FILTER_DIALOG.SORT_BY.ALPHABET', 'ALPHABET',
    {ascending: 'fa-sort-alpha-up', descending: 'fa-sort-alpha-down'},
    (a: ExperimentResult, b: ExperimentResult) => a.name?.localeCompare(b.name)),
  new SortByFilterEntity('EXPERIMENTS.FILTER_DIALOG.SORT_BY.CREATION_DATE', 'CREATION_DATE',
    {ascending: 'fa-sort-numeric-up', descending: 'fa-sort-numeric-down'},
    (a: ExperimentResult, b: ExperimentResult) => a.date - b.date),
  new SortByFilterEntity('EXPERIMENTS.FILTER_DIALOG.SORT_BY.TYPE', 'TYPE',
    {ascending: 'fa-stethoscope', descending: 'fa-stethoscope'},
    (a: ExperimentResult, b: ExperimentResult) => a.type - b.type)
];
