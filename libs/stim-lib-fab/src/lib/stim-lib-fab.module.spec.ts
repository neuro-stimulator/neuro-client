import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimLibFabModule } from './stim-lib-fab.module';

describe('StimLibFabModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StimLibFabModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimLibFabModule).toBeDefined();
  });
});
