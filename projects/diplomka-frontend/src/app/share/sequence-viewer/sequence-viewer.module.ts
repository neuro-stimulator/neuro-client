import { NgModule } from '@angular/core';
import { SequenceViewerComponent } from './sequence-viewer.component';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SequenceViewerComponent
  ],
    imports: [
        CommonModule,
        ChartsModule,
        TranslateModule
    ],
  exports: [
    SequenceViewerComponent
  ]
})
export class SequenceViewerModule {

}
