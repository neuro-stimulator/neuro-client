import { async, TestBed } from '@angular/core/testing';
import { StimLibCommonModule } from './stim-lib-common.module';

describe('StimLibCommonModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimLibCommonModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimLibCommonModule).toBeDefined();
  });
});
