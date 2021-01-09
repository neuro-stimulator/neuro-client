import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureAboutModule } from './stim-feature-about.module';

describe('StimFeatureAboutModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureAboutModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureAboutModule).toBeDefined();
  });
});
