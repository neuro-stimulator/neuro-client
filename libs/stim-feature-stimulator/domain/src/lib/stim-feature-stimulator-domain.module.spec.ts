import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureStimulatorDomainModule } from './stim-feature-stimulator-domain.module';

describe('StimFeatureStimulatorDomainModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StimFeatureStimulatorDomainModule],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(StimFeatureStimulatorDomainModule).toBeDefined();
  });
});
