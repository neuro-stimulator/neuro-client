import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentViewerComponent } from './experiment-viewer.component';

describe('ExperimentViewerComponent', () => {
  let component: ExperimentViewerComponent;
  let fixture: ComponentFixture<ExperimentViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
