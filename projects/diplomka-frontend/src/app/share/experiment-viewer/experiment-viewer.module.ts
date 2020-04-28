import { NgModule } from '@angular/core';
import { ExperimentViewerComponent } from './experiment-viewer.component';
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [
    ExperimentViewerComponent
  ],
  imports: [
    Ng5SliderModule
  ],
  exports: [
    ExperimentViewerComponent
  ]
})
export class ExperimentViewerModule {

}
