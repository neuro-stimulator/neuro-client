import { NgModule } from '@angular/core';
import { TagEditorComponent } from './tag-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TagEditorComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  exports: [
    TagEditorComponent
  ]
})
export class TagEditorModule {

}
