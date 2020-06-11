import { async, TestBed } from '@angular/core/testing';
import { StimFeatureSettingsFeatureParamConfigModule } from './stim-feature-settings-feature-param-config.module';

describe('StimFeatureSettingsFeatureParamConfigModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureSettingsFeatureParamConfigModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureSettingsFeatureParamConfigModule).toBeDefined();
  });
});
