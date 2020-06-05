import { async, TestBed } from '@angular/core/testing';
import { StimFeatureAboutModule } from './stim-feature-about.module';

describe('StimFeatureAboutModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureAboutModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureAboutModule).toBeDefined();
  });
});
