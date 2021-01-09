import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureSettingsFeatureModule } from './stim-feature-settings-feature.module';

describe('StimFeatureSettingsFeatureModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureSettingsFeatureModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureSettingsFeatureModule).toBeDefined();
  });
});
