import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureFileBrowserDomainModule } from './stim-feature-file-browser-domain.module';

describe('StimFeatureFileBrowserDomainModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StimFeatureFileBrowserDomainModule],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(StimFeatureFileBrowserDomainModule).toBeDefined();
  });
});
