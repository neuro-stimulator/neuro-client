import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureSettingsFeatureParamConfigModule } from './stim-feature-settings-feature-param-config.module';

describe('StimFeatureSettingsFeatureParamConfigModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StimFeatureSettingsFeatureParamConfigModule],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(StimFeatureSettingsFeatureParamConfigModule).toBeDefined();
  });
});
