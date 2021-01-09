import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimLibUiModule } from './stim-lib-ui.module';

describe('StimLibUiModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StimLibUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimLibUiModule).toBeDefined();
  });
});
