import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimLibStoreModule } from './stim-lib-store.module';

describe('StimLibStoreModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StimLibStoreModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimLibStoreModule).toBeDefined();
  });
});
