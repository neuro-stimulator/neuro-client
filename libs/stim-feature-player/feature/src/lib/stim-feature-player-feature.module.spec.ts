import { async, TestBed } from '@angular/core/testing';
import { StimFeaturePlayerFeatureModule } from './stim-feature-player-feature.module';

describe('StimFeaturePlayerFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeaturePlayerFeatureModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeaturePlayerFeatureModule).toBeDefined();
  });
});
