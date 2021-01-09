import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeaturePlayerDomainModule } from './stim-feature-player-domain.module';

describe('StimFeaturePlayerDomainModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StimFeaturePlayerDomainModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeaturePlayerDomainModule).toBeDefined();
  });
});
