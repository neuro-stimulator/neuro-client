import { async, TestBed } from '@angular/core/testing';
import { StimFeatureExperimentsFeatureModule } from './stim-feature-experiments-feature.module';

describe('StimFeatureExperimentsFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StimFeatureExperimentsFeatureModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StimFeatureExperimentsFeatureModule).toBeDefined();
  });
});
