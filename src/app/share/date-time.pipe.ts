import { Pipe, PipeTransform } from '@angular/core';
import { DateTimeFormat } from './date-time-format';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  private readonly pipe: DatePipe = new DatePipe('cs_CZ');

  constructor() {}

  transform(value: Date|number, format: DateTimeFormat): string {
    if (!(value instanceof Date)) {
      value = new Date(value);
    }

    let template = '';

    if (format.showDays) {
      template += `dd.`;
    }
    if (format.showMonths) {
      if (format.showDays) {
      }
      template += `M.`;
    }
    if (format.showYears) {
      if (format.showDays || format.showMonths) {
      }
      template += `yyyy`;
    }

    template += ' ';

    if (format.showHours) {
      template += `HH`;
    }
    if (format.showMinutes) {
      if (format.showHours) {
        template += ':';
      }
      template += `mm`;
    }
    if (format.showSeconds) {
      if (format.showHours || format.showMinutes) {
        template += ':';
      }
      template += `ss`;
    }

    let result = this.pipe.transform(value, template);

    if (format.showMiliseconds) {
      if (format.showHours || format.showMinutes || format.showSeconds) {
        result += ':';
      }
      result += value.getMilliseconds();
    }

    return result;
  }

}
