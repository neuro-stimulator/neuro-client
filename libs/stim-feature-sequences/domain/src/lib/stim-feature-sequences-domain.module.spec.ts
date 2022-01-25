import { TestBed, waitForAsync } from '@angular/core/testing';
import { StimFeatureSequencesDomainModule } from './stim-feature-sequences-domain.module';

describe('StimFeatureSequencesDomainModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StimFeatureSequencesDomainModule],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(StimFeatureSequencesDomainModule).toBeDefined();
  });
});
