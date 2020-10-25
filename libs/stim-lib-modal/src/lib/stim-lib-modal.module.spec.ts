import { async, TestBed } from '@angular/core/testing';
import { StimLibModalModule } from './stim-lib-modal.module';

describe('StimLibModalModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimLibModalModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimLibModalModule).toBeDefined();
  });
});
