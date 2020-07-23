import { async, TestBed } from '@angular/core/testing';
import { StimFeatureFileBrowserDomainModule } from './stim-feature-file-browser-domain.module';

describe('StimFeatureFileBrowserDomainModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureFileBrowserDomainModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureFileBrowserDomainModule).toBeDefined();
  });
});
