import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimLibCommonModule } from './stim-lib-common.module';

describe('StimLibCommonModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StimLibCommonModule],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(StimLibCommonModule).toBeDefined();
  });
});
