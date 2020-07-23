import { async, TestBed } from '@angular/core/testing';
import { StimFeatureSequencesDomainModule } from './stim-feature-sequences-domain.module';

describe('StimFeatureSequencesDomainModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureSequencesDomainModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureSequencesDomainModule).toBeDefined();
  });
});
