export * from './lib/stim-feature-experiments-domain.module';

export { ExperimentsFacade } from './lib/application-services/experiments.facade';

export { ExperimentsState } from './lib/store/experiments.type';

export { isNameValid, synchronizeOutputsSelector } from './lib/store/experiments.reducer';
