import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { TranslateModule } from "@ngx-translate/core";
import { Ng5SliderModule } from "ng5-slider";
import { ChartsModule } from "ng2-charts";

import { StimLibModalModule } from "@diplomka-frontend/stim-lib-modal";
import { StimLibCommonModule } from "@diplomka-frontend/stim-lib-common";
import { StimLibFabModule } from "@diplomka-frontend/stim-lib-fab";

import { TagEditorComponent } from "./tag-editor/tag-editor.component";
import { DropdownBtnComponent } from "./dropdown-btn/dropdown-btn.component";
import { ExperimentViewerComponent } from "./experiment-viewer/experiment-viewer.component";
import { SequenceViewerComponent } from "./sequence-viewer/sequence-viewer.component";
import { PageToolsComponent } from "./page-tools/page-tools.component";
import { AudioPlayerComponent } from "./audio-player/audio-player.component";
import { AudioTitlePipe } from "./audio-player/audio-title.pipe";
import { SecondsToMinutesPipe } from "./audio-player/seconds-to-minutes.pipe";
import { ImagePlayerComponent } from "./image-player/image-player.component";
import { FileBrowserComponent } from "./file-browser/file-browser.component";
import { ListButtonsAddonComponent } from "./list-buttons-addon/list-buttons-addon.component";

@NgModule({
  declarations: [
    DropdownBtnComponent,
    ExperimentViewerComponent,
    SequenceViewerComponent,
    TagEditorComponent,
    PageToolsComponent,
    AudioPlayerComponent,
    AudioTitlePipe,
    SecondsToMinutesPipe,
    ImagePlayerComponent,
    FileBrowserComponent,
    ListButtonsAddonComponent
  ],
  imports: [
    RouterModule,
    Ng5SliderModule,
    ChartsModule,
    TranslateModule,
    StimLibModalModule,
    StimLibCommonModule,
    StimLibFabModule
  ],
  exports: [
    StimLibModalModule,
    StimLibFabModule,
    StimLibCommonModule,
    Ng5SliderModule,

    DropdownBtnComponent,
    ExperimentViewerComponent,
    SequenceViewerComponent,
    TagEditorComponent,
    PageToolsComponent,
    AudioPlayerComponent,
    ImagePlayerComponent,
    FileBrowserComponent,
    ListButtonsAddonComponent
  ]
})
export class StimLibUiModule {}
