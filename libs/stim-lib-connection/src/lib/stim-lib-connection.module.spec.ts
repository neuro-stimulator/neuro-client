import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimLibConnectionModule } from './stim-lib-connection.module';

describe('StimLibConnectionModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StimLibConnectionModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimLibConnectionModule).toBeDefined();
  });
});
