import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureSequencesFeatureModule } from './stim-feature-sequences-feature.module';

describe('StimFeatureSequencesFeatureModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StimFeatureSequencesFeatureModule],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(StimFeatureSequencesFeatureModule).toBeDefined();
  });
});
