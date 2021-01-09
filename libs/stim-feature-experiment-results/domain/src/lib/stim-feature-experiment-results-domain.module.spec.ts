import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureExperimentResultsDomainModule } from './stim-feature-experiment-results-domain.module';

describe('StimFeatureExperimentResultsDomainModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureExperimentResultsDomainModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureExperimentResultsDomainModule).toBeDefined();
  });
});
