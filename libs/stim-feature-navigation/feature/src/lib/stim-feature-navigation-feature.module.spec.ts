import { async, TestBed } from '@angular/core/testing';
import { StimFeatureNavigationFeatureModule } from './stim-feature-navigation-feature.module';

describe('StimFeatureNavigationFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureNavigationFeatureModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureNavigationFeatureModule).toBeDefined();
  });
});
