import { formatDate } from '@angular/common';
import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

// 2020-11-07T07:19:59.933Z -> "07 Nov 2020, 07:19"
@Pipe({ name: 'forumDate' })
export class ForumDatePipe implements PipeTransform {
  private readonly locale = inject(LOCALE_ID);

  transform(value: string | Date): string {
    return formatDate(value, 'dd MMM yyyy, HH:mm', this.locale);
  }
}
