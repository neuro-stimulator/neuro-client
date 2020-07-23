import { async, TestBed } from '@angular/core/testing';
import { StimFeatureSettingsPopupModule } from './stim-feature-settings-popup.module';

describe('StimFeatureSettingsApiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureSettingsPopupModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureSettingsPopupModule).toBeDefined();
  });
});
