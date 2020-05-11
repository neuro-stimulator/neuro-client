import { Experiment, ExperimentType, outputTypeToRaw } from '@stechy1/diplomka-share';
import { GroupByFilterEntity, GroupFilter, SortByFilterEntity, SortFilter } from 'stim-lib-list-utils';

export const GROUP_BY_FILTERS: GroupFilter<Experiment>[] = [
  new GroupByFilterEntity('SHARE.DIALOGS.FILTER.GROUP_BY.TYPE', 'type', 'fa-stethoscope',
    (experiment: Experiment) => `${experiment.type}`,
    (experiment: Experiment, group: string) => experiment.type === +group,
    () => false,
    (group: string) => ExperimentType[+group]),
  new GroupByFilterEntity('SHARE.DIALOGS.FILTER.GROUP_BY.TAG', 'tag', 'fa-tags',
    (experiment) => experiment.tags,
    (experiment: Experiment, group: string) => experiment.tags.includes(group),
    (experiment: Experiment, group: string) => experiment.tags.length === 0,
    (group) => group)
];


export const SORT_BY_FILTERS: SortFilter<Experiment>[] = [
  new SortByFilterEntity('SHARE.DIALOGS.FILTER.SORT_BY.ALPHABET', 'alphabet',
    {ascending: 'fa-sort-alpha-up', descending: 'fa-sort-alpha-down'},
    (a: Experiment, b: Experiment) => a.name.localeCompare(b.name)),
  new SortByFilterEntity('SHARE.DIALOGS.FILTER.SORT_BY.CREATION_DATE', 'creation_date',
    {ascending: 'fa-sort-numeric-up', descending: 'fa-sort-numeric-down'},
    (a: Experiment, b: Experiment) => a.created - b.created),
  new SortByFilterEntity('SHARE.DIALOGS.FILTER.SORT_BY.TYPE', 'type',
    {ascending: 'fa-stethoscope', descending: 'fa-stethoscope'},
    (a: Experiment, b: Experiment) => a.type - b.type),
  new SortByFilterEntity('SHARE.DIALOGS.FILTER.SORT_BY.OUTPUT_TYPE', 'output_type',
    {ascending: 'fa-plug', descending: 'fa-plug'},
    (a: Experiment, b: Experiment) => outputTypeToRaw(a.usedOutputs) - outputTypeToRaw(b.usedOutputs)),
  new SortByFilterEntity('SHARE.DIALOGS.FILTER.SORT_BY.OUTPUT_COUNT', 'output_count',
    {ascending: 'fa-hashtag', descending: 'fa-plug'},
    (a: Experiment, b: Experiment) => a.outputCount - b.outputCount),
];
