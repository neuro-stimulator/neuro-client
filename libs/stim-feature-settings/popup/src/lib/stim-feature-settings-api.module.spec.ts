import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureSettingsPopupModule } from './stim-feature-settings-popup.module';

describe('StimFeatureSettingsApiModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureSettingsPopupModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureSettingsPopupModule).toBeDefined();
  });
});
