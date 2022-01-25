import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureExperimentResultsDomainModule } from './stim-feature-experiment-results-domain.module';

describe('StimFeatureExperimentResultsDomainModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StimFeatureExperimentResultsDomainModule],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(StimFeatureExperimentResultsDomainModule).toBeDefined();
  });
});
