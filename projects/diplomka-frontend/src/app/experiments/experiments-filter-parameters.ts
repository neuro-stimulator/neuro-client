import { Experiment, ExperimentType, outputTypeToRaw } from '@stechy1/diplomka-share';
import { GroupByFilterEntity, GroupFilter, SortByFilterEntity, SortFilter } from 'stim-lib-list-utils';

export const GROUP_BY_FILTERS: GroupFilter<Experiment>[] = [
  new GroupByFilterEntity('EXPERIMENTS.FILTER_DIALOG.GROUP_BY.TYPE', 'TYPE', 'fa-stethoscope',
    (experiment: Experiment) => `${experiment.type}`,
    (experiment: Experiment, group: string) => experiment.type === +group,
    () => false,
    (group: string) => ExperimentType[+group]),
  new GroupByFilterEntity('EXPERIMENTS.FILTER_DIALOG.GROUP_BY.TAG', 'TAG', 'fa-tags',
    (experiment) => experiment.tags,
    (experiment: Experiment, group: string) => experiment.tags.includes(group),
    (experiment: Experiment, group: string) => experiment.tags.length === 0,
    (group) => group)
];


export const SORT_BY_FILTERS: SortFilter<Experiment>[] = [
  new SortByFilterEntity('EXPERIMENTS.FILTER_DIALOG.SORT_BY.ALPHABET', 'ALPHABET',
    {ascending: 'fa-sort-alpha-up', descending: 'fa-sort-alpha-down'},
    (a: Experiment, b: Experiment) => a.name.localeCompare(b.name)),
  new SortByFilterEntity('EXPERIMENTS.FILTER_DIALOG.SORT_BY.CREATION_DATE', 'CREATION_DATE',
    {ascending: 'fa-sort-numeric-up', descending: 'fa-sort-numeric-down'},
    (a: Experiment, b: Experiment) => a.created - b.created),
  new SortByFilterEntity('EXPERIMENTS.FILTER_DIALOG.SORT_BY.TYPE', 'TYPE',
    {ascending: 'fa-stethoscope', descending: 'fa-stethoscope'},
    (a: Experiment, b: Experiment) => a.type - b.type),
  new SortByFilterEntity('EXPERIMENTS.FILTER_DIALOG.SORT_BY.OUTPUT_TYPE', 'OUTPUT_TYPE',
    {ascending: 'fa-plug', descending: 'fa-plug'},
    (a: Experiment, b: Experiment) => outputTypeToRaw(a.usedOutputs) - outputTypeToRaw(b.usedOutputs)),
  new SortByFilterEntity('EXPERIMENTS.FILTER_DIALOG.SORT_BY.OUTPUT_COUNT', 'OUTPUT_COUNT',
    {ascending: 'fa-hashtag', descending: 'fa-plug'},
    (a: Experiment, b: Experiment) => a.outputCount - b.outputCount),
];
