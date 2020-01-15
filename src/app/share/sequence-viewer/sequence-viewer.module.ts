import { NgModule } from '@angular/core';
import { SequenceViewerComponent } from './sequence-viewer.component';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    SequenceViewerComponent
  ],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [
    SequenceViewerComponent
  ]
})
export class SequenceViewerModule {

}
