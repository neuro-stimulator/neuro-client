import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureSettingsDomainModule } from './stim-feature-settings-domain.module';

describe('StimFeatureSettingsDomainModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StimFeatureSettingsDomainModule],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(StimFeatureSettingsDomainModule).toBeDefined();
  });
});
