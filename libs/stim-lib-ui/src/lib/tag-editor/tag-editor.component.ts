import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'stim-lib-ui-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.sass']
})
export class TagEditorComponent implements OnInit {

  @Input() form: FormGroup;
  newTagValid = true;

  constructor() {
  }

  get tags() {
    return this.form.get('tags');
  }

  ngOnInit() {
    this.tags.setValidators([]);
  }

  handleAddTag(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.newTagValid) {
      return;
    }
    const tags: string[] = this.tags.value;
    const srcElement = event.target as HTMLInputElement;
    tags.push(srcElement.value);
    srcElement.value = '';
    srcElement.focus();
  }

  handleRemove(tag: any) {
    const tags: string[] = this.tags.value;
    const index = tags.indexOf(tag);

    if (index >= 0) {
      tags.splice(index, 1);
    }
  }

  handleTagValueChange(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.newTagValid = ((this.tags.value as string[]).indexOf(value) === -1);
    if (value) {
      this.tags.markAsTouched();
    } else {
      this.tags.markAsUntouched();
    }
  }
}
