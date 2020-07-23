import { async, TestBed } from '@angular/core/testing';
import { StimFeatureSettingsFeatureConsoleModule } from './stim-feature-settings-feature-console.module';

describe('StimFeatureSettingsFeatureConsoleModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureSettingsFeatureConsoleModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureSettingsFeatureConsoleModule).toBeDefined();
  });
});
