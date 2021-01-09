import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimLibCommonModule } from './stim-lib-common.module';

describe('StimLibCommonModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StimLibCommonModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimLibCommonModule).toBeDefined();
  });
});
