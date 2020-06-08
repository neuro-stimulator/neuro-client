import { async, TestBed } from '@angular/core/testing';
import { StimFeatureSettingsFeatureModule } from './stim-feature-settings-feature.module';

describe('StimFeatureSettingsFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureSettingsFeatureModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureSettingsFeatureModule).toBeDefined();
  });
});
