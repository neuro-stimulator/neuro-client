import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureExperimentsFeatureModule } from './stim-feature-experiments-feature.module';

describe('StimFeatureExperimentsFeatureModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StimFeatureExperimentsFeatureModule],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(StimFeatureExperimentsFeatureModule).toBeDefined();
  });
});
