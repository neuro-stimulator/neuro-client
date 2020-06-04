import { async, TestBed } from '@angular/core/testing';
import { FabModule } from './fab.module';

describe('StimLibFabModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FabModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FabModule).toBeDefined();
  });
});
