import { async, TestBed } from '@angular/core/testing';
import { StimLibListUtilsModule } from './stim-lib-list-utils.module';

describe('StimLibListUtilsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimLibListUtilsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimLibListUtilsModule).toBeDefined();
  });
});
