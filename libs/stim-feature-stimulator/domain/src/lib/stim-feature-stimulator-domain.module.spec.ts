import { async, TestBed } from '@angular/core/testing';
import { StimFeatureStimulatorDomainModule } from './stim-feature-stimulator-domain.module';

describe('StimFeatureStimulatorDomainModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureStimulatorDomainModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureStimulatorDomainModule).toBeDefined();
  });
});
