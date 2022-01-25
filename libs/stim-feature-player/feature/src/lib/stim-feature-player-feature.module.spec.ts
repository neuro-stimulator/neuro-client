import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeaturePlayerFeatureModule } from './stim-feature-player-feature.module';

describe('StimFeaturePlayerFeatureModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StimFeaturePlayerFeatureModule],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(StimFeaturePlayerFeatureModule).toBeDefined();
  });
});
