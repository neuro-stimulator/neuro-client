import { async, TestBed } from '@angular/core/testing';
import { StimFeatureFileBrowserFeatureModule } from './stim-feature-file-browser-feature.module';

describe('StimFeatureFileBrowserFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureFileBrowserFeatureModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureFileBrowserFeatureModule).toBeDefined();
  });
});
