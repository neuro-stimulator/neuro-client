import { async, TestBed } from '@angular/core/testing';
import { StimFeatureSettingsFeatureParamConfigExperimentsModule } from './stim-feature-settings-feature-param-config-experiments.module';

describe('StimFeatureSettingsFeatureParamConfigExperimentsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureSettingsFeatureParamConfigExperimentsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(
      StimFeatureSettingsFeatureParamConfigExperimentsModule
    ).toBeDefined();
  });
});
