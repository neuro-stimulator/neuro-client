import { Experiment } from '@stechy1/diplomka-share';

import { environment } from '../../environments/environment';

export const dependencyValidatorPattern = `^[0-${environment.maxOutputCount}]x[1-9]+[0-9]*`;

export const outputCountValidatorPattern = `^[0-${environment.maxOutputCount}]{1}$`;

export type ExperimentGroup = { group: string, experiments: Experiment[] }[];
