import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureFileBrowserFeatureModule } from './stim-feature-file-browser-feature.module';

describe('StimFeatureFileBrowserFeatureModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureFileBrowserFeatureModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureFileBrowserFeatureModule).toBeDefined();
  });
});
