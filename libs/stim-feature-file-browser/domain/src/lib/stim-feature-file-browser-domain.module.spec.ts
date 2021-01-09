import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureFileBrowserDomainModule } from './stim-feature-file-browser-domain.module';

describe('StimFeatureFileBrowserDomainModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureFileBrowserDomainModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureFileBrowserDomainModule).toBeDefined();
  });
});
