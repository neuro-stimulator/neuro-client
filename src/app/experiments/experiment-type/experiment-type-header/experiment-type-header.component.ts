import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-experiment-type-header',
  templateUrl: './experiment-type-header.component.html',
  styleUrls: ['./experiment-type-header.component.sass']
})
export class ExperimentTypeHeaderComponent implements OnInit {

  @Input() form: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  get tags() {
    return this.form.get('tags');
  }

  handleRemove(tag: any) {
    const tags: string[] = this.tags.value;
    const index = tags.indexOf(tag);

    if (index >= 0) {
      tags.splice(index, 1);
    }
  }

  handleTagKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const tags: string[] = this.tags.value;
      const srcElement = event.target as HTMLInputElement;
      tags.push(srcElement.value);
      srcElement.value = '';
    }
  }
}
