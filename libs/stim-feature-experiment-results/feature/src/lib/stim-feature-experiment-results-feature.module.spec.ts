import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureExperimentResultsFeatureModule } from './stim-feature-experiment-results-feature.module';

describe('StimFeatureExperimentResultsFeatureModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StimFeatureExperimentResultsFeatureModule],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(StimFeatureExperimentResultsFeatureModule).toBeDefined();
  });
});
