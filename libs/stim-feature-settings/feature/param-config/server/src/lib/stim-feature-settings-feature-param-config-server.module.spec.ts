import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureSettingsFeatureParamConfigServerModule } from './stim-feature-settings-feature-param-config-server.module';

describe('StimFeatureSettingsFeatureParamConfigServerModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StimFeatureSettingsFeatureParamConfigServerModule],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(StimFeatureSettingsFeatureParamConfigServerModule).toBeDefined();
  });
});
