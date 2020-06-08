import { async, TestBed } from '@angular/core/testing';
import { StimFeaturePlayerDomainModule } from './stim-feature-player-domain.module';

describe('StimFeaturePlayerDomainModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeaturePlayerDomainModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeaturePlayerDomainModule).toBeDefined();
  });
});
