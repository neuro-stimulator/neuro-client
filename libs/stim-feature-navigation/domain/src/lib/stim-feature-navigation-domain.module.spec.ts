import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureNavigationDomainModule } from './stim-feature-navigation-domain.module';

describe('StimFeatureNavigationDomainModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StimFeatureNavigationDomainModule],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(StimFeatureNavigationDomainModule).toBeDefined();
  });
});
