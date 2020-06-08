import { async, TestBed } from '@angular/core/testing';
import { StimLibConnectionModule } from './stim-lib-connection.module';

describe('StimLibConnectionModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimLibConnectionModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimLibConnectionModule).toBeDefined();
  });
});
