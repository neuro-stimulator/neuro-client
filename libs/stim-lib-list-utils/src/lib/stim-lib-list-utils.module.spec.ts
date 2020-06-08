import { async, TestBed } from '@angular/core/testing';
import { ListUtilsModule } from './list-utils.module';

describe('StimLibListUtilsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ListUtilsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ListUtilsModule).toBeDefined();
  });
});
