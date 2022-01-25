import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureExperimentsDomainModule } from './stim-feature-experiments-domain.module';

describe('StimFeatureExperimentsDomainModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StimFeatureExperimentsDomainModule],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(StimFeatureExperimentsDomainModule).toBeDefined();
  });
});
