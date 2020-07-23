import { async, TestBed } from '@angular/core/testing';
import { StimFeatureNavigationDomainModule } from './stim-feature-navigation-domain.module';

describe('StimFeatureNavigationDomainModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureNavigationDomainModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureNavigationDomainModule).toBeDefined();
  });
});
