import { NgModule } from '@angular/core';
import { TagEditorComponent } from './tag-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TagEditorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    TagEditorComponent
  ]
})
export class TagEditorModule {

}
