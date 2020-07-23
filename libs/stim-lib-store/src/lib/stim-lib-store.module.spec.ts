import { async, TestBed } from '@angular/core/testing';
import { StimLibStoreModule } from './stim-lib-store.module';

describe('StimLibStoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimLibStoreModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimLibStoreModule).toBeDefined();
  });
});
