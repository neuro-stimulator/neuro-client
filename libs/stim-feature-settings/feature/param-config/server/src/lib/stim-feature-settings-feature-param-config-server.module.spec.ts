import { async, TestBed } from '@angular/core/testing';
import { StimFeatureSettingsFeatureParamConfigServerModule } from './stim-feature-settings-feature-param-config-server.module';

describe('StimFeatureSettingsFeatureParamConfigServerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureSettingsFeatureParamConfigServerModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureSettingsFeatureParamConfigServerModule).toBeDefined();
  });
});
