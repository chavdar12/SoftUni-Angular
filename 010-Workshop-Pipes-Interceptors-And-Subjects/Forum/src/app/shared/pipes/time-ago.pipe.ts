import { Pipe, PipeTransform } from '@angular/core';

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * 24 * 60 * 60],
  ['month', 30 * 24 * 60 * 60],
  ['week', 7 * 24 * 60 * 60],
  ['day', 24 * 60 * 60],
  ['hour', 60 * 60],
  ['minute', 60],
];

const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

// 2020-11-07T07:19:59.933Z -> "6 years ago"
@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date): string {
    const seconds = Math.round((new Date(value).getTime() - Date.now()) / 1000);
    for (const [unit, unitSeconds] of UNITS) {
      if (Math.abs(seconds) >= unitSeconds) {
        return formatter.format(Math.round(seconds / unitSeconds), unit);
      }
    }
    return 'just now';
  }
}
