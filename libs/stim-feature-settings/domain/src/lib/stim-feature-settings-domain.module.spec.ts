import { async, TestBed } from '@angular/core/testing';
import { StimFeatureSettingsDomainModule } from './stim-feature-settings-domain.module';

describe('StimFeatureSettingsDomainModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureSettingsDomainModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureSettingsDomainModule).toBeDefined();
  });
});
