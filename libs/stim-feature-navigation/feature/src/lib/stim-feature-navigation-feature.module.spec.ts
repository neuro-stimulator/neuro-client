import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureNavigationFeatureModule } from './stim-feature-navigation-feature.module';

describe('StimFeatureNavigationFeatureModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StimFeatureNavigationFeatureModule],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(StimFeatureNavigationFeatureModule).toBeDefined();
  });
});
