import { async, TestBed } from '@angular/core/testing';
import { StimLibFabModule } from './stim-lib-fab.module';

describe('StimLibFabModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimLibFabModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimLibFabModule).toBeDefined();
  });
});
