import { async, TestBed } from '@angular/core/testing';
import { StimFeatureExperimentResultsDomainModule } from './stim-feature-experiment-results-domain.module';

describe('StimFeatureExperimentResultsDomainModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureExperimentResultsDomainModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureExperimentResultsDomainModule).toBeDefined();
  });
});
