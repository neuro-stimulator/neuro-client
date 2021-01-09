import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureHelpFeatureModule } from './stim-feature-help-feature.module';

describe('StimFeatureHelpFeatureModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureHelpFeatureModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureHelpFeatureModule).toBeDefined();
  });
});
