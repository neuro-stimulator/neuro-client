import { async, TestBed } from '@angular/core/testing';
import { StimFeatureSettingsFeatureServiceStateModule } from './stim-feature-settings-feature-service-state.module';

describe('StimFeatureSettingsFeatureServiceStateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureSettingsFeatureServiceStateModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureSettingsFeatureServiceStateModule).toBeDefined();
  });
});
