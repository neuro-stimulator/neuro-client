import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureSequencesFeatureModule } from './stim-feature-sequences-feature.module';

describe('StimFeatureSequencesFeatureModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureSequencesFeatureModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureSequencesFeatureModule).toBeDefined();
  });
});
