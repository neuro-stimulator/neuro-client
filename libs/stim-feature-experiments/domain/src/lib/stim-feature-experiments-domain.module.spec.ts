import { async, TestBed } from '@angular/core/testing';
import { StimFeatureExperimentsDomainModule } from './stim-feature-experiments-domain.module';

describe('StimFeatureExperimentsDomainModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureExperimentsDomainModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureExperimentsDomainModule).toBeDefined();
  });
});
