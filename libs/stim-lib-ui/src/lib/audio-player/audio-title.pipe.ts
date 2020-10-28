import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'audioTitle' })
export class AudioTitlePipe implements PipeTransform {
  transform(value: string): string {
    const slashIndex = value.lastIndexOf('/');
    if (slashIndex === -1) {
      return value;
    }

    return value.substr(slashIndex + 1);
  }
}
