import { async, TestBed } from '@angular/core/testing';
import { StimFeatureSequencesFeatureModule } from './stim-feature-sequences-feature.module';

describe('StimFeatureSequencesFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureSequencesFeatureModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureSequencesFeatureModule).toBeDefined();
  });
});
