import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureSettingsFeatureParamConfigApplicationModule } from './stim-feature-settings-feature-param-config-application.module';

describe('StimFeatureSettingsFeatureParamConfigApplicationModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StimFeatureSettingsFeatureParamConfigApplicationModule],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(StimFeatureSettingsFeatureParamConfigApplicationModule).toBeDefined();
  });
});
