import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimLibListUtilsModule } from './stim-lib-list-utils.module';

describe('StimLibListUtilsModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StimLibListUtilsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimLibListUtilsModule).toBeDefined();
  });
});
