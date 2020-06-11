import { async, TestBed } from '@angular/core/testing';
import { StimFeatureSettingsFeatureParamConfigApplicationModule } from './stim-feature-settings-feature-param-config-application.module';

describe('StimFeatureSettingsFeatureParamConfigApplicationModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureSettingsFeatureParamConfigApplicationModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(
      StimFeatureSettingsFeatureParamConfigApplicationModule
    ).toBeDefined();
  });
});
