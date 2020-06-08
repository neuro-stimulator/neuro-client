import { async, TestBed } from '@angular/core/testing';
import { StimFeatureExperimentResultsFeatureModule } from './stim-feature-experiment-results-feature.module';

describe('StimFeatureExperimentResultsFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureExperimentResultsFeatureModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureExperimentResultsFeatureModule).toBeDefined();
  });
});
