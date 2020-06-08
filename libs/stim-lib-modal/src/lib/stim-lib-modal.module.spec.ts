import { async, TestBed } from '@angular/core/testing';
import { ModalModule } from './modal.module';

describe('StimLibModalModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModalModule).toBeDefined();
  });
});
